//import liraries
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {createOpenLink} from 'react-native-open-maps';
import {COLOURS} from '../utils/Colours';
import * as Animatable from 'react-native-animatable';
import {useDispatch} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import DatePicker from 'react-native-datepicker';
import {useSelector} from 'react-redux';
import {dialNumber, getReadableDateAndTime} from '../utils/utils';
import LoaderShimmerComponent from '../components/LoaderShimmerComponent';
import ViewProviderComponent from '../components/ViewProviderComponent';
import {BackViewHeader} from '../components/Header';
import {deviceHeight, deviceWidth, fp, wp} from '../utils/responsive-screen';
import {IMAGES} from '../utils/Images';
import {
  getAllOrdersWithDate,
  getAllCompletedOrders,
} from '../store/actions/orders';
import OrderCardComponent from '../components/OrderCardComponent';
import MontserratSemiBold from '../components/Text/MontserratSemiBold';
import MontserratBold from '../components/Text/MontserratBold';
import MontserratMedium from '../components/Text/MontserratMedium';
// create a component
const OrderHistoryScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const [endDate, setEndDate] = useState('');
  let todaysDate = new Date();
  let name = 'Nerojust Adjeks';
  let phone = '08012345678';
  let address = 'Necom House';
  const travelType = 'drive';
  const [orderArray, setOrderArray] = useState([]);
  const [singleTripCount, setSingleTripCount] = useState(0);
  const [batchTripCount, setBatchTripCount] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.users);
  const {
    orders,
    pendingOrders,
    completedOrders,
    ordersLoading,
    getOrderLoading,
    patchOrderLoading,
  } = useSelector((state) => state.orders);
  //console.log('completed orders', completedOrders.length);
  const refRBSheet = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    var singleCount = 0;
    var batchCount = 0;
    if (completedOrders) {
      completedOrders.map((order, i) => {
        // console.log('counting', order?.dispatch_orders.length);
        if (order?.dispatch_orders.length > 1) {
          batchCount++;
        } else if (order?.dispatch_orders.length == 1) {
          singleCount++;
        }
      });
      setSingleTripCount(singleCount);
      setBatchTripCount(batchCount);
    }
  }, [completedOrders]);

  const fetchData = () => {
    dispatch(getAllCompletedOrders()).then((result) => {
      if (result) {
        setHasDataLoaded(true);
        setIsSearch(false);
      }
    });
  };

  const onRefresh = () => {
    fetchData();
  };
  const renderHeaderCounter = (data) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 30,
          marginBottom: 5,
        }}>
        <MontserratSemiBold style={styles.orderCountText}>
          {data?.dispatch_orders.length > 1
            ? data?.dispatch_orders.length + ' Orders'
            : data?.dispatch_orders.length + ' Order'}
        </MontserratSemiBold>

        <MontserratSemiBold style={styles.orderCountText}>
          1 Trip
        </MontserratSemiBold>
      </View>
    );
  };
  const renderBatchList = (item, data) => {
    if (item?.order) {
      let address1 =
        item.order && item.order.customer
          ? item.order.customer.address
          : address;
      //console.log("address1", address1)
      let end = address1;
      return (
        <OrderCardComponent
          name={item.order.customer.name ? item.order.customer.name : name}
          address={item.order.customer ? item.order.customer.address : address}
          phoneNumber={
            item.order.customer ? item.order.customer.phoneNumber : phone
          }
          status={item.status}
          date={getReadableDateAndTime(item.updatedAt)}
          onPressNavigate={createOpenLink({
            travelType,
            end,
            provider: 'google',
          })}
          onPressCall={() =>
            dialNumber(
              item.order.customer ? item.order.customer.phoneNumber : phone,
            )
          }
          onPressView={() =>
            navigation.navigate('OrderHistoryDetails', {
              id: item.id,
              name: item.order.customer ? item.order.customer.name : name,
              address: item.order.customer
                ? item.order.customer.address
                : address,
              phoneNumber: item.order.customer
                ? item.order.customer.phoneNumber
                : phone,
              status: item.status,
              date: item.updatedAt,
              parentId: data.id,
              parentStatus: data.status,
            })
          }
        />
      );
    }
  };
  const renderItem = (data) => {
    //console.log('data in render', data);
    if (data?.dispatch_orders.length > 1) {
      return (
        <FlatList
          data={data?.dispatch_orders}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => renderBatchList(item, data)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeaderCounter(data)}
        />
      );
    } else {
      let item = data?.dispatch_orders ? data?.dispatch_orders[0] : {};
      //console.log("Item is ", item);

      if (item?.order) {
        let address1 =
          item.order && item.order.customer
            ? item.order.customer.address
            : address;
        //console.log("address1", address1)
        let end = address1;
        return (
          <>
            {renderHeaderCounter(data)}
            <OrderCardComponent
              name={item.order.customer.name ? item.order.customer.name : name}
              address={
                item.order.customer ? item.order.customer.address : address
              }
              phoneNumber={
                item.order.customer ? item.order.customer.phoneNumber : phone
              }
              status={item.status}
              date={getReadableDateAndTime(item.updatedAt)}
              onPressNavigate={createOpenLink({
                travelType,
                end,
                provider: 'google',
              })}
              onPressCall={() =>
                dialNumber(
                  item.order.customer ? item.order.customer.phoneNumber : phone,
                )
              }
              onPressView={() =>
                navigation.navigate('OrderHistoryDetails', {
                  id: item.id,
                  name: item.order.customer ? item.order.customer.name : name,
                  address: item.order.customer
                    ? item.order.customer.address
                    : address,
                  phoneNumber: item.order.customer
                    ? item.order.customer.phoneNumber
                    : phone,
                  status: item.status,
                  date: item.updatedAt,
                  parentId: data.id,
                  parentStatus: data.status,
                })
              }
            />
          </>
        );
      }
    }
  };

  const handleDismissDialog = () => {
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }
    setStartDate('');
    setEndDate('');
  };
  const makeSearchRequest = () => {
    dispatch(getAllOrdersWithDate(startDate, endDate)).then((result) => {
      if (result) {
        clearDateFields();
        setIsSearch(true);
      }
    });
  };
  const clearDateFields = () => {
    setStartDate('');
    setEndDate('');
  };
  const validateSearch = () => {
    if (startDate != '' && startDate != null) {
      if (endDate != '' && endDate != null) {
        handleDismissDialog();
        makeSearchRequest();
      } else {
        alert('End date is required');
      }
    } else {
      alert('Start date is required');
    }
  };
  const renderDatePickerBottomSheet = () => {
    return (
      <RBSheet
        ref={refRBSheet}
        animationType={'slide'}
        closeDuration={0}
        openDuration={0}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        // height={
        //   Platform.OS == 'ios' ? hp(deviceHeight / 2.5) : hp(deviceHeight / 2.055)
        // }
        customStyles={{
          wrapper: {
            backgroundColor: COLOURS.transparentColour,
          },
          draggableIcon: {
            width: 0,
            top: 5,
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderColor: COLOURS.lightGray,
            borderWidth: 0.4,
            backgroundColor: COLOURS.zupa_rider_bg,
          },
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            //marginTop: 10,
            flex: 0.8,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 15,
              marginBottom: 20,
              //fontWeight: "bold",
            }}>
            Filter records by date range
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 5,
              marginBottom: 20,
            }}>
            <View
              style={{
                marginRight: 10,
                height: 50,
                backgroundColor: COLOURS.lightGray5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <DatePicker
                style={{width: wp(140)}}
                date={startDate}
                mode="date"
                placeholder="Start date"
                format="YYYY-MM-DD"
                minDate="2020-01-01"
                androidMode={'spinner'}
                maxDate={todaysDate}
                confirmBtnText="Confirm"
                showIcon={true}
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 5,
                    //top: 4,
                    marginLeft: 0,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  dateInput: {
                    borderColor: COLOURS.transparent,
                  },
                }}
                onDateChange={(date) => {
                  setStartDate(date);
                }}
              />
            </View>
            <View
              style={{
                marginLeft: 10,
                height: 50,
                backgroundColor: COLOURS.lightGray5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <DatePicker
                style={{width: wp(140)}}
                date={endDate}
                mode="date"
                placeholder="End date"
                format="YYYY-MM-DD"
                minDate="2020-01-01"
                androidMode={'spinner'}
                maxDate={todaysDate}
                confirmBtnText="Confirm"
                showIcon={true}
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 5,
                    //top: 4,
                    marginLeft: 0,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  dateInput: {
                    borderColor: COLOURS.transparent,
                  },
                }}
                onDateChange={(date) => {
                  setEndDate(date);
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 0,
              padding: 10,
            }}>
            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              activeOpacity={0.4}
              style={{
                flex: 1,
                backgroundColor: COLOURS.lightGray2,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: COLOURS.gray,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={validateSearch}
              activeOpacity={0.5}
              style={{
                flex: 1,
                backgroundColor: COLOURS.blue,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: COLOURS.white,
                  alignSelf: 'center',
                }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    );
  };
  const renderCalculateHeader = () => {
    return (
      <>
        <View style={styles.countView}>
          {hasDataLoaded && completedOrders && completedOrders.length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
                paddingVertical: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MontserratSemiBold style={styles.totalTripText}>
                  Total trips:{' '}
                </MontserratSemiBold>
                <MontserratSemiBold style={styles.totalTripText}>
                  {completedOrders.length}
                </MontserratSemiBold>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MontserratSemiBold style={styles.singleText}>
                  Single:{' '}
                </MontserratSemiBold>
                <MontserratSemiBold style={styles.singleText}>
                  {singleTripCount}
                </MontserratSemiBold>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MontserratSemiBold style={styles.batchText}>
                  Batch:{' '}
                </MontserratSemiBold>
                <MontserratSemiBold style={styles.batchText}>
                  {batchTripCount}
                </MontserratSemiBold>
              </View>
            </View>
          ) : null}
        </View>
      </>
    );
  };
  const renderOrderListView = () => {
    return (
      <Animatable.View animation="fadeInUp" duraton="1500" style={{flex: 1}}>
        <FlatList
          data={completedOrders || []}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item?.dispatch_orders[0]?.id}
          renderItem={({item, index}) => renderItem(item)}
          initialNumToRender={5}
          showsVerticalScrollIndicator={false}
        />
      </Animatable.View>
    );
  };
  const renderNoOrdersView = () => {
    return (
      <View style={styles.parentView}>
        <MontserratBold style={styles.nameTextview}>
          Hello {user?.rider?.name}!
        </MontserratBold>

        <MontserratMedium style={styles.newOrderText}>
          You have no riding history {isSearch ? 'for this time frame' : ''}
        </MontserratMedium>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.refreshView}
          onPress={fetchData}>
          <MontserratSemiBold style={styles.refreshTextview}>
            Refresh
          </MontserratSemiBold>
        </TouchableOpacity>
        <Image source={IMAGES.bike} style={styles.image} />
      </View>
    );
  };

  return (
    <ViewProviderComponent>
      <BackViewHeader
        backText={'Rider History'}
        image={IMAGES.arrowLeft}
        imageRight={IMAGES.search}
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => refRBSheet.current.open()}
        shouldDisplayIcon={true}
        imageStyle={{marginRight: 20}}
      />

      {renderDatePickerBottomSheet()}
      <>
        {renderCalculateHeader()}

        {hasDataLoaded && completedOrders && completedOrders.length > 0
          ? renderOrderListView()
          : hasDataLoaded && completedOrders?.length == 0
          ? renderNoOrdersView()
          : null}
      </>
      <LoaderShimmerComponent isLoading={ordersLoading} />
      <LoaderShimmerComponent isLoading={patchOrderLoading} />
    </ViewProviderComponent>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.zupa_rider_bg,
  },
  parentView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 40,
  },
  nameText: {
    fontSize: fp(15),
    color: COLOURS.textInputColor,
  },
  totalTripText: {
    fontSize: fp(15),
    color: COLOURS.gray,
  },
  singleText: {
    fontSize: fp(15),
    color: COLOURS.blue,
  },
  batchText: {
    fontSize: fp(15),
    color: COLOURS.blue,
  },
  helloView: {justifyContent: 'center', alignItems: 'center'},
  helloText: {
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 5,
    fontSize: fp(18),
  },
  helloText1: {
    marginHorizontal: 5,
    marginBottom: 5,
  },

  inProgressView: {
    width: 90,
    height: 30,
    backgroundColor: COLOURS.lightPurple,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  orderCountText: {
    fontSize: fp(15),
    color: COLOURS.textInputColor,
    //flex: 1,
  },
  countView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: 14,
    // paddingVertical: 5,
    // paddingHorizontal: 15,
    // marginVertical: 10,
  },
  startRideView: {
    width: 80,
    height: 30,
    backgroundColor: COLOURS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  startRideText: {
    fontSize: fp(13),
    color: COLOURS.white,
  },
  inProgressText: {
    fontSize: fp(12),
    color: COLOURS.blue,
  },
  iconImageView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshView: {
    width: 124,
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.blue,
    borderRadius: 10,
    //top: -deviceHeight * 0.1,
    borderRadius: 30,
    marginVertical: 40,
  },

  image: {
    flex: 1.5,
    width: deviceWidth,
    height: deviceHeight * 0.3,
  },
  noOrderTextview: {
    fontSize: 14,
    fontWeight: '300',
  },
  nameTextview: {
    fontSize: fp(21),
    flex: 0.15,
  },
  refreshTextview: {
    fontSize: fp(15),
    // fontWeight: '300',

    color: COLOURS.white,
  },
});

//make this component available to the app
export default OrderHistoryScreen;
