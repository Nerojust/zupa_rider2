//import liraries
import React, {useEffect, useCallback, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {COLOURS} from '../utils/Colours';
import {SIZES} from '../utils/Sizes';
import * as Animatable from 'react-native-animatable';
import LoadingDialog from '../components/LoadingDialog';
import MontserratBold from '../components/Text/MontserratBold';

import {
  dialNumber,
  getOrdersRequest,
  getReadableDateAndTime,
  getTodaysDate,
  toggleDrawer,
} from '../utils/utils';
import {useSelector, useDispatch} from 'react-redux';

import {handleError} from '../utils/utils';
import ViewProviderComponent from '../components/ViewProviderComponent';
import {BackViewHeader} from '../components/Header';
import OrderCardComponent from '../components/OrderCardComponent';
import {deviceHeight, deviceWidth, fp} from '../utils/responsive-screen';
import {IMAGES} from '../utils/Images';
import MontserratMedium from '../components/Text/MontserratMedium';
import MontserratSemiBold from '../components/Text/MontserratSemiBold';
import {getAllOrders, patchOrder} from '../store/actions/orders';
import {createOpenLink} from 'react-native-open-maps';
import LoaderShimmerComponent from '../components/LoaderShimmerComponent';

// create a component
const DashboardScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const flatListRef = useRef(null);
  let name = '';
  let phone = '';
  let address = '';
  const travelType = 'drive';
  var newOrderList = [];
  const dispatch = useDispatch();
  const [isResultOrderEmpty, setIsResultOrderEmpty] = useState(false);
  const {user} = useSelector((state) => state.users);
  //console.log("redux user", user)

  const {
    orders,
    ordersLoading,
    getOrderLoading,
    patchOrderLoading,
  } = useSelector((state) => state.orders);
  //console.log("orders redux", orders);
  const [orderArray, setOrderArray] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await dispatch(getAllOrders());
  }
  const onRefresh = () => {
    fetchData();
  };

  const renderBatchList = (item, data) => {
    if (item.order) {
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
            navigation.navigate('OrderDetails', {
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
    if (data?.dispatch_orders && data?.dispatch_orders.length > 1) {
      return (
        <FlatList
          data={data?.dispatch_orders}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => renderBatchList(item, data)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.countView}>
                <MontserratSemiBold style={styles.orderCountText}>
                  {data.dispatch_orders.length} orders (batch)
                </MontserratSemiBold>

                {!isOrderLoading && data.status == 'pending' ? (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => handleStartJourneyDialog(data.id)}
                    style={styles.startRideView}>
                    <MontserratSemiBold style={styles.startRideText}>
                      Start ride
                    </MontserratSemiBold>
                  </TouchableOpacity>
                ) : data.status == 'started' ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.inProgressView}>
                    <MontserratSemiBold style={styles.inProgressText}>
                      In progress
                    </MontserratSemiBold>
                  </TouchableOpacity>
                ) : null}
              </View>
            </>
          }
        />
      );
    } else {
      let item = data.dispatch_orders ? data?.dispatch_orders[0] : {};

      if (item.order) {
        let address1 =
          item.order && item.order.customer
            ? item.order.customer.address
            : address;
        //console.log("address1", address1)
        let end = address1;
        return (
          <>
            <View style={styles.countView}>
              <MontserratSemiBold style={styles.orderCountText}>
                1 Order
              </MontserratSemiBold>

              {data?.status == 'pending' ? (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => handleStartJourneyDialog(data.id)}
                  style={styles.startRideView}>
                  <MontserratSemiBold style={styles.startRideText}>
                    Start ride
                  </MontserratSemiBold>
                </TouchableOpacity>
              ) : data?.status == 'started' ? (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.inProgressView}>
                  <MontserratSemiBold style={styles.inProgressText}>
                    In progress...
                  </MontserratSemiBold>
                </TouchableOpacity>
              ) : null}
            </View>

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
              statusMessage={data.status}
              isJourneyStarted={isJourneyStarted}
              isOrderLoading={isOrderLoading}
              pressStart={() => {
                console.log('Start id is', data.id);
                handleStartJourneyDialog(data.id);
              }}
              onPressView={() =>
                navigation.navigate('OrderDetails', {
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

  /**
   * Method to start the journey for an order or batch
   * @param {id to patch} data_id
   */
  const handleStartJourneyDialog = (data_id) => {
    Alert.alert(
      'Trip Alert',
      'Do you want to start this trip?',
      [
        {
          text: 'No',
          onPress: () => {
            console.log('cancel Pressed');
          },
        },
        {
          text: 'Yes',
          onPress: () => startJourneyRequest(data_id),
        },
      ],
      {cancelable: true},
    );
  };

  /**
   * start journey for an order
   * @param {parent dispatch id} dispatchId
   */
  const startJourneyRequest = (dispatchId) => {
    setLoadingMessage('Starting trip for this order');

    var payload = {
      status: 'started',
      model: 'dispatch',
    };
    dispatch(patchOrder(dispatchId, payload));
  };

  return (
    <ViewProviderComponent>
      <BackViewHeader
        backText={'Today is ' + getTodaysDate()}
        image={IMAGES.menu}
        onLeftPress={() => toggleDrawer(navigation)}
        shouldDisplayIcon
        style={{width: deviceWidth, borderBottomWidth: 0}}
      />

      <>
        {!isLoading && orders && orders.length > 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <MontserratBold
              style={{
                marginTop: 5,
                marginHorizontal: 5,
                marginBottom: 5,
                fontSize: fp(18),
              }}>
              Hi, {user?.rider?.name},
            </MontserratBold>
            <MontserratMedium
              style={{
                marginHorizontal: 5,
                marginBottom: 5,
              }}>
              you have new order/s
            </MontserratMedium>
          </View>
        ) : null}

        {orders && orders.length > 0 ? (
          <Animatable.View animation="fadeInUp" duraton="500" style={{flex: 1}}>
            <FlatList
              ref={flatListRef}
              data={orders}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyExtractor={(item, index) => item?.id + index}
              renderItem={({item, index}) => renderItem(item)}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={{paddingBottom: 50}} />}
            />
          </Animatable.View>
        ) : isResultOrderEmpty || orders.length == 0 ? (
          <View style={styles.parentView}>
            <MontserratBold style={styles.nameTextview}>
              Hello {user?.rider?.name}!
            </MontserratBold>

            <MontserratMedium
              style={{
                marginHorizontal: 5,
                marginBottom: 5,
                flex: 0.5,
                fontSize: fp(19),
              }}>
              You have no orders {'\n'} assigned for today
            </MontserratMedium>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.refreshView}
              onPress={() =>
                getOrdersRequest(
                  setLoadingMessage,
                  setIsLoading,
                  'Fetching your orders for today...',
                  loginData,
                  dispatch,
                  true,
                  flatListRef,
                  setIsResultOrderEmpty,
                  setRefreshing,
                )
              }>
              <MontserratSemiBold style={styles.refreshTextview}>
                Refresh
              </MontserratSemiBold>
            </TouchableOpacity>
            <Image source={IMAGES.bike} style={[styles.image, {flex: 1.5}]} />
          </View>
        ) : null}
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
    //justifyContent: "center",
    alignItems: 'center',
    backgroundColor: COLOURS.white,
  },
  parentView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 40,
  },
  bg_view: {
    width: SIZES.width - 20,
    height: SIZES.width / 2.4,
    backgroundColor: COLOURS.white,
    justifyContent: 'center',
  },
  mainView: {padding: 13, flex: 0.7, justifyContent: 'center'},
  actionRowView: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
    color: COLOURS.blue,
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
    color: COLOURS.riderTextColour,
    flex: 1,
  },
  countView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginVertical: 10,
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
    top: -deviceHeight * 0.1,
    borderRadius: 30,
  },
  clickButtonView: {
    flex: 0.5,
    width: SIZES.width - 20,
    height: SIZES.width / 7,
    backgroundColor: COLOURS.lightGray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameView: {fontSize: 18, fontWeight: 'bold'},
  phoneNumber: {fontSize: 15, fontWeight: 'bold'},
  addressView: {fontSize: 14, paddingVertical: 7},

  image: {
    //top: -100,
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
export default DashboardScreen;
