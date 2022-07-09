//import liraries
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import {COLOURS} from '../utils/Colours';
import SendSMS from 'react-native-sms';
import {createOpenLink} from 'react-native-open-maps';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {
  dialNumber,
  dismissLoaderButton,
  getTodaysDate,
  showLoaderButton,
} from '../utils/utils';
import {BackViewHeader} from '../components/Header';
import {IMAGES} from '../utils/Images';
import {deviceWidth, fp} from '../utils/responsive-screen';
import ViewProviderComponent from '../components/ViewProviderComponent';
import MontserratSemiBold from '../components/Text/MontserratSemiBold';
import CircleImageComponent from '../components/CircleImage';
import LoaderButtonComponent from '../components/LoaderButtonComponent';
import {
  getOrder,
  patchEndTrip,
  patchOrder,
  patchOrderMarkComplete,
  patchParentOrder,
  updateDispatchStatus,
} from '../store/actions/orders';
import LoaderShimmerComponent from '../components/LoaderShimmerComponent';
import MontserratBold from '../components/Text/MontserratBold';

const OrderDetailScreen = ({route, navigation}) => {
  const dispatchId = route.params.id;
  const data = route.params.data;
  const riderId = route.params.riderId;
  const [order, setOrder] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  //console.log('data', data);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [orderCount, setOrderCount] = useState(0);
  const [dispatchOrder, setDispatchOrder] = useState([]);
  const [isMarkComplete, setIsMarkComplete] = useState(false);
  const dispatch = useDispatch();
  var loadingButtonRef = useRef();
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const {
    orders,
   // order,
    ordersLoading,
    getOrderLoading,
    patchOrderLoading,
  } = useSelector((state) => state.orders);
  //console.log('order redux', order);
  const end = order?.customer?.address;
  const travelType = 'drive';
  const openLocation = createOpenLink({travelType, end, provider: 'google'});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setHasDataLoaded(false);
    await dispatch(getOrder(dispatchId)).then((result) => {
      if (result) {
        console.log("dispatch status",result.dispatchstatus)
        setHasDataLoaded(true);
        setOrder(result);
      }
    });
  }

  const onRefresh = () => {
    fetchData();
  };

  const sendTextMessage = () => {
    SendSMS.send(
      {
        body:
          'Hello ' +
          order?.customer?.name.trim() +
          ', I will be delivering your package today. Please be on standby. Thank you',
        recipients: [order?.customer?.phonenumber.trim()],
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log(
          'SMS Callback: completed: ' +
            completed +
            ' cancelled: ' +
            cancelled +
            ' error: ' +
            error,
        );
      },
    );
  };
  const sendWhatsappMessage = () => {
    let whatsAppMessage =
      'Hello ' +
      order?.customer?.name +
      ', I will be delivering your package today. Please be on standby. Thank you';
    let URL =
      'whatsapp://send?text=' +
      whatsAppMessage +
      '&phone=234' +
      order?.customer?.phonenumber.trim();

    Linking.openURL(URL)
      .then((data) => {
        console.log('WhatsApp Opened', data);
      })
      .catch((error) => {
        alert('Oops! seems whatsapp is not installed on your device');
        console.log('No whatsapp app found', error);
      });
  };

  const handleCompleteDialog = () => {
    Alert.alert(
      'Order Alert',
      'Do you want to complete this order?',
      [
        {
          text: 'No',
          onPress: () => {
            console.log('cancel Pressed');
          },
        },
        {
          text: 'Yes',
          onPress: () => {
            //console.log('journey status before is ' + order?.status);

            completeJourneyRequest();
            //console.log('journey status after is ' + order?.status);
          },
        },
      ],
      {cancelable: true},
    );
  };
  const handleStartRideDialog = () => {
    Alert.alert(
      'Order Alert',
      'Do you want to start this ride?',
      [
        {
          text: 'No',
          onPress: () => {
            console.log('cancel Pressed');
          },
        },
        {
          text: 'Yes',
          onPress: () => {
            startJourneyRequest();
          },
        },
      ],
      {cancelable: true},
    );
  };
  const [hasStartedRide, setHasStartedRide] = useState(false);
  const startJourneyRequest = () => {
    var payload = {
      status: 'started',
    };
    showLoaderButton(loadingButtonRef);

    setHasDataLoaded(false);
    dispatch(updateDispatchStatus(dispatchId, payload, riderId)).then(
      (result) => {
        if (result) {
        
          fetchData()
      
          dismissLoaderButton(loadingButtonRef);
        }
      },
    );
  };
  const completeJourneyRequest = () => {
    var payload = {
      status: 'completed',
    };
    showLoaderButton(loadingButtonRef);

    setHasDataLoaded(false);
    dispatch(updateDispatchStatus(dispatchId, payload, riderId)).then(
      (result) => {
        if (result) {
          // console.log('the journey has started', result);
          fetchData();
          setHasDataLoaded(true);
          dismissLoaderButton(loadingButtonRef);
        }
      },
    );
  };
  /**
   * This performs the completed patch for a single order
   */
  // const performPatchForDispatchItem = async () => {
  //   var payload = {
  //     status: 'completed',
  //   };
  //   showLoaderButton(loadingButtonRef);
  //   setHasDataLoaded(false);
  //   await dispatch(patchOrderMarkComplete(dispatchOrder?.id, payload)).then(
  //     async (result) => {
  //       if (result) {
  //         //console.log('ended single dispatch item');
  //         // var result1 = dispatch(getOrder(retrievedId));

  //         // computeEndTrip(result1);
  //         alert('Order update successful');
  //         navigation.goBack();
  //       }
  //     },
  //   );
  //   dismissLoaderButton(loadingButtonRef);
  //   setHasDataLoaded(true);
  // };

  const renderOrderDetails = () => {
    return (
      <View
        style={{
          //flex: 1,
          marginTop: 15,
          paddingHorizontal: 30,
        }}>
        <MontserratSemiBold style={{fontSize: fp(15), color: COLOURS.gray5}}>
          Customer Name
        </MontserratSemiBold>

        <MontserratSemiBold
          style={{
            fontSize: fp(17),
            color: COLOURS.textInputColor,
            marginTop: 3,
          }}>
          {order?.customer?.name || 'No name'}
        </MontserratSemiBold>
        <MontserratSemiBold
          style={{fontSize: fp(15), color: COLOURS.gray5, marginTop: 13}}>
          Date
        </MontserratSemiBold>

        <MontserratSemiBold
          style={{
            fontSize: fp(15),
            color: COLOURS.textInputColor,
            marginTop: 4,
          }}>
          {moment(order?.updatedat).format('LLL')}
        </MontserratSemiBold>

        <MontserratSemiBold
          style={{fontSize: fp(15), color: COLOURS.gray5, marginTop: 15}}>
          Location
        </MontserratSemiBold>

        <MontserratSemiBold
          style={{
            fontSize: fp(15),
            color: COLOURS.textInputColor,
            marginTop: 4,
          }}>
          {order?.customer?.address || 'No address'}
        </MontserratSemiBold>

        <MontserratSemiBold
          style={{fontSize: fp(15), color: COLOURS.gray5, marginTop: 17}}>
          Phone Number
        </MontserratSemiBold>
        <MontserratSemiBold
          style={{fontSize: 15, color: COLOURS.textInputColor, marginTop: 4}}>
          {order?.customer?.phonenumber || 'No phone number'}
        </MontserratSemiBold>
      </View>
    );
  };
  const renderActionbuttons = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity
            onPress={openLocation}
            style={{
              //flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 30,
            }}>
            <CircleImageComponent
              image={IMAGES.location}
              onPress={openLocation}
              style={{
                backgroundColor: COLOURS.lightPurple,
                marginRight: 10,
              }}
            />
            <MontserratSemiBold style={{color: COLOURS.zupaBlue}}>
              Navigate
            </MontserratSemiBold>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dialNumber(order?.customer?.phonenumber)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              right: 20,
            }}>
            <CircleImageComponent
              image={IMAGES.call}
              onPress={() => dialNumber(order?.customer?.phonenumber)}
              style={{
                backgroundColor: COLOURS.lightPurple,
                marginRight: 10,
              }}
            />
            <MontserratSemiBold style={{color: COLOURS.zupaBlue}}>
              Call
            </MontserratSemiBold>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity
            onPress={sendTextMessage}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',

              marginLeft: 30,
            }}>
            <CircleImageComponent
              image={IMAGES.text}
              onPress={sendTextMessage}
              isText
              style={{
                backgroundColor: COLOURS.lightPurple,
                marginRight: 10,
              }}
            />
            <MontserratSemiBold style={{color: COLOURS.zupaBlue}}>
              Text
            </MontserratSemiBold>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={sendWhatsappMessage}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //justifyContent: 'center',
              flex: 1,
              //right: 20,
            }}>
            <CircleImageComponent
              image={IMAGES.whatsapp}
              isWhatsapp
              onPress={sendWhatsappMessage}
              style={{
                backgroundColor: COLOURS.green,
                marginRight: 10,
              }}
            />
            <MontserratSemiBold style={{color: COLOURS.zupaBlue}}>
              Whatsapp
            </MontserratSemiBold>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderCompleteButtons = () => {
   // console.log('button status', order.dispatchstatus);
    return (
      <>
        {order?.dispatchstatus == 'pending' ? (
          <View style={{marginTop: 30}}>
            <LoaderButtonComponent
              buttonRef={loadingButtonRef}
              title={'Start Trip'}
              method={handleStartRideDialog}
              bgColour={COLOURS.blue}
              radius={30}
            />
          </View>
        ) : null}
        {order?.dispatchstatus == 'started' ? (
          <View style={{marginTop: 30}}>
            <LoaderButtonComponent
              buttonRef={loadingButtonRef}
              title={'Mark Complete'}
              method={handleCompleteDialog}
              bgColour={COLOURS.darkslateblue}
              radius={30}
            />
          </View>
        ) : null}

        {order?.dispatchstatus == 'completed' ? (
          <View style={{marginTop: 30}}>
            <LoaderButtonComponent
              buttonRef={loadingButtonRef}
              title={'Completed'}
              method={() => {}}
              bgColour={COLOURS.green3}
              radius={30}
            />
          </View>
        ) : null}
        {/* {order?.dispatchstatus == 'completed' ? (
          <View style={{marginTop: 30}}>
            <LoaderButtonComponent
              buttonRef={loadingButtonRef}
              title={
                'Completed Batch ' +
                orderCount +
                ' of ' +
                order?.products.length
              }
              //method={handleNothing}
              bgColour={COLOURS.green3}
              radius={30}
            />
          </View>
        ) : null} */}
      </>
    );
  };
  return (
    <ViewProviderComponent>
      <BackViewHeader
        backText={'Order Details'}
        image={IMAGES.arrowLeft}
        onLeftPress={() => navigation.goBack()}
        style={{width: deviceWidth, borderBottomWidth: 0}}
      />
      {/* {hasDataLoaded ? ( */}
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        
          //keyExtractor={(item, index) => item?.id + index}
          renderItem={null}
          ListHeaderComponent={
            <>
              {renderOrderDetails()}
              {renderActionbuttons()}
              {renderCompleteButtons()}
            </>
          }
        />
      {/* ) : null} */}

      <LoaderShimmerComponent isLoading={patchOrderLoading} />
      <LoaderShimmerComponent isLoading={getOrderLoading} />
    </ViewProviderComponent>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOURS.white,
  },
  dateView: {
    fontSize: 15,
    fontWeight: 'normal',
    marginTop: 15,
    color: COLOURS.gray1,
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
});

//make this component available to the app
export default OrderDetailScreen;
