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
import MontserratBold from '../components/Text/MontserratBold';

import {
  dialNumber,
  displayDialog,
  getOrdersRequest,
  getReadableDateAndTime,
  getTodaysDate,
  toggleDrawer,
} from '../utils/utils';
import {useSelector, useDispatch} from 'react-redux';
import ViewProviderComponent from '../components/ViewProviderComponent';
import {BackViewHeader} from '../components/Header';
import OrderCardComponent from '../components/OrderCardComponent';
import {deviceHeight, deviceWidth, fp} from '../utils/responsive-screen';
import {IMAGES} from '../utils/Images';
import MontserratMedium from '../components/Text/MontserratMedium';
import MontserratSemiBold from '../components/Text/MontserratSemiBold';
import {
  getAllPendingOrders,
  patchOrder,
  patchParentOrder,
  updateDispatchStatus,
} from '../store/actions/orders';
import {createOpenLink} from 'react-native-open-maps';
import LoaderShimmerComponent from '../components/LoaderShimmerComponent';
import {getDateWithoutTime} from '../utils/DateFilter';

// create a component
const DashboardScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);
  let name = '';
  let phone = '';
  let address = '';
  const travelType = 'drive';
  var newOrderList = [];
  const dispatch = useDispatch();
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const {user} = useSelector((state) => state.users);
  //console.log("redux user", user)

  const {
    orders,
    pendingOrders,
    completedOrders,
    ordersLoading,
    getOrderLoading,
    patchOrderLoading,
  } = useSelector((state) => state.orders);
  //console.log('pendingOrders redux',completedOrders);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setHasDataLoaded(false);
    await dispatch(
      getAllPendingOrders(user?.rider?.id, getDateWithoutTime(new Date())),
    ).then((result) => {
      if (result) {
        //filterDataResult();
        setHasDataLoaded(true);
      }
    });
  }

  const onRefresh = () => {
    fetchData();
  };

  const renderHeaderCounter = (data) => {
    return (
      <View style={styles.countView}>
        <MontserratSemiBold style={styles.orderCountText}>
          {data?.products.length > 1
            ? data?.products.length + ' Items'
            : data?.products.length + ' Item'}
        </MontserratSemiBold>

        {hasDataLoaded && data?.dispatchstatus == 'pending' ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => handleStartJourneyDialog(data.id, 'started')}
            style={styles.startRideView}>
            <MontserratSemiBold style={styles.startRideText}>
              Start ride
            </MontserratSemiBold>
          </TouchableOpacity>
        ) : data?.dispatchstatus == 'started' ? (
          <TouchableOpacity activeOpacity={0.8} style={styles.inProgressView}>
            <MontserratSemiBold style={styles.inProgressText}>
              In progress
            </MontserratSemiBold>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  const renderItem = (item) => {
    let end = item?.customer?.address;
    return (
      <>
        {renderHeaderCounter(item)}
        {/* check if there is an item and the order status has been completed */}

        {item && item?.order?.status == 'completed' ? (
          <OrderCardComponent
            name={item?.customer?.name ? item?.customer?.name : 'None'}
            address={item?.customer ? item?.customer?.address : 'None'}
            phoneNumber={item?.customer ? item?.customer?.phonenumber : 'None'}
            status={item?.dispatchstatus}
            date={getReadableDateAndTime(item?.updatedat)}
            onPressNavigate={createOpenLink({
              travelType,
              end,
              provider: 'google',
            })}
            onPressCall={() =>
              dialNumber(item?.customer ? item?.customer?.phonenumber : 0)
            }
            statusMessage={item?.dispatchstatus}
            pressStart={() => {
              console.log('Start id is', item?.id);
              handleStartJourneyDialog(item?.id, 'started');
            }}
            onPressView={() =>
              navigation.navigate('OrderDetails', {
                id: item.id,
                data: item,
                riderId: user?.rider?.id,
              })
            }
          />
        ) : null}
      </>
    );
  };
  /**
   *
   * @param {*} id item id
   * @param {*} status status name
   */
  const handleStartJourneyDialog = (id, status) => {
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
          onPress: () => startJourneyRequest(id, status),
        },
      ],
      {cancelable: true},
    );
  };

  /**
   * start journey for an order
   * @param {parent dispatch id} dispatchId
   */
  const startJourneyRequest = (dispatchId, statusValue) => {
    var payload = {
      status: statusValue,
    };
    dispatch(
      updateDispatchStatus(dispatchId, payload, user?.rider?.id, false),
    ).then((result) => {
      if (result) {
      }
    });
  };

  const renderNoOrdersView = () => {
    return (
      <View style={styles.parentView}>
        <MontserratBold style={styles.nameTextview}>
          Hello {user?.rider?.name}!
        </MontserratBold>

        <MontserratMedium style={styles.newOrderText}>
          You have no orders {'\n'} assigned for today
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

  const renderOrderListView = () => {
    return (
      <Animatable.View animation="fadeInUp" duraton="500" style={{flex: 1}}>
        <FlatList
          ref={flatListRef}
          data={pendingOrders || []}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item, index) => (item?.id + index).toString()}
          renderItem={({item}) => renderItem(item)}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          ListFooterComponent={<View style={{paddingBottom: 50}} />}
        />
      </Animatable.View>
    );
  };

  const renderGreetingView = () => {
    return (
      <View style={styles.helloView}>
        <MontserratBold style={styles.helloText}>
          Hi, {user?.rider?.name},
        </MontserratBold>
        <MontserratMedium style={styles.helloText1}>
          you have new order/s
        </MontserratMedium>
      </View>
    );
  };

  return (
    <ViewProviderComponent>
      <BackViewHeader
        backText={getTodaysDate()}
        image={IMAGES.menu}
        onLeftPress={() => toggleDrawer(navigation)}
        style={{width: deviceWidth, borderBottomWidth: 0}}
      />

      <>
        {!hasDataLoaded && pendingOrders && pendingOrders.length > 0
          ? renderGreetingView()
          : null}

        {hasDataLoaded && pendingOrders && pendingOrders.length > 0
          ? renderOrderListView()
          : hasDataLoaded && pendingOrders?.length == 0
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
    //justifyContent: "center",
    alignItems: 'center',
    backgroundColor: COLOURS.white,
  },
  newOrderText: {
    marginHorizontal: 5,
    marginBottom: 5,
    flex: 0.5,
    fontSize: fp(19),
    color: COLOURS.gray,
  },
  parentView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 40,
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
export default DashboardScreen;
