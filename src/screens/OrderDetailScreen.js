//import liraries
import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Linking, Alert} from 'react-native';
import {COLOURS} from '../utils/Colours';
import SendSMS from 'react-native-sms';
import {createOpenLink} from 'react-native-open-maps';
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
} from '../store/actions/orders';
import LoaderShimmerComponent from '../components/LoaderShimmerComponent';
import MontserratBold from '../components/Text/MontserratBold';

const OrderDetailScreen = ({route, navigation}) => {
  const retrievedId = route.params.parentId;
  const batchId = route.params.batchId;
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
    order,
    ordersLoading,
    getOrderLoading,
    patchOrderLoading,
  } = useSelector((state) => state.orders);
  //console.log('order redux', order);
  const end = address;
  const travelType = 'drive';
  const openLocation = createOpenLink({travelType, end, provider: 'google'});

  useEffect(() => {
    dispatch(getOrder(retrievedId)).then((result) => {
      if (result) {
        //console.log("start data", result)
        var count = 0;
        result?.dispatch_orders?.map((childOrder, i) => {
          if (childOrder?.status == 'completed') {
            count++;
          }
        });
        setOrderCount(count);
        setTimeout(() => {
          setHasDataLoaded(true);
        }, 200);
      }
    });
  }, []);

  useEffect(() => {
    if (order) {
      var result = order?.dispatch_orders.find((item, i) => item.id == batchId);
    }

    setDispatchOrder(result);
    var count = 0;
    order?.dispatch_orders?.map((childOrder, i) => {
      if (childOrder?.status == 'completed') {
        count++;
      }
    });
    setOrderCount(count);
  }, [order?.status]);

  const sendTextMessage = () => {
    SendSMS.send(
      {
        body:
          'Hello ' +
          dispatchOrder?.order?.customer?.name +
          ', I will be delivering your package today. Please be on standby. Thank you',
        recipients: [dispatchOrder?.order?.customer?.phoneNumber],
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
      dispatchOrder?.order?.customer?.name +
      ', I will be delivering your package today. Please be on standby. Thank you';
    let URL =
      'whatsapp://send?text=' +
      whatsAppMessage +
      '&phone=234' +
      dispatchOrder?.order?.customer?.phoneNumber;

    Linking.openURL(URL)
      .then((data) => {
        console.log('WhatsApp Opened', data);
      })
      .catch((error) => {
        alert('Oops! seems whatsapp is not installed on your device');
        console.log('No whatsapp app found', error);
      });
  };
  const handleNothing = () => {};

  const handleComplete = () => {
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

            performPatchForDispatchItem();
            //console.log('journey status after is ' + order?.status);
          },
        },
      ],
      {cancelable: true},
    );
  };
  const handleStartRide = () => {
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

  const startJourneyRequest = () => {
    var payload = {
      status: 'started',
      //model: 'dispatch',
    };
    showLoaderButton(loadingButtonRef);

    setHasDataLoaded(false);
    dispatch(patchParentOrder(order?.id, payload, false)).then((result) => {
      if (result) {
        // console.log('the journey has started', result);
        dispatch(getOrder(retrievedId));
      }
    });

    dismissLoaderButton(loadingButtonRef);
    setHasDataLoaded(true);
  };
  /**
   * This performs the completed patch for a single order
   */
  const performPatchForDispatchItem = async () => {
    var payload = {
      status: 'completed',
    };
    showLoaderButton(loadingButtonRef);
    setHasDataLoaded(false);
    await dispatch(patchOrderMarkComplete(dispatchOrder?.id, payload)).then(
      async (result) => {
        if (result) {
          //console.log('ended single dispatch item');
          // var result1 = dispatch(getOrder(retrievedId));

          // computeEndTrip(result1);
          alert('Order update successful');
          navigation.goBack();
        }
      },
    );
    dismissLoaderButton(loadingButtonRef);
    setHasDataLoaded(true);
  };

  const computeEndTrip = (result) => {
    var count = 0;

    if (result?.dispatch_orders && order?.dispatch_orders.length > 1) {
      //console.log('dispatch is more than 1, batch');

      result?.dispatch_orders?.map((childOrder, i) => {
        //console.log('childorder status', childOrder?.status);
        if (childOrder?.status == 'completed') {
          count++;
        }
        if (count == result?.dispatch_orders.length) {
          // console.log('Count is ' + count);
          // console.log(
          //   'count is equal to the dispatch length, so end trip for batch',
          // );
          endTrip();
        }
      });
    } else if (result?.dispatch_orders.length == 1) {
      // console.log(
      //   'dispatch is a single order and is equal to 1',
      //   result.dispatch_orders[0].status,
      // );
      if (result?.dispatch_orders[0]?.status == 'completed') {
        // console.log('single order is completed already, start end trip');
        endTrip();
      }
    }
  };

  /**
   * this handles the parent status update to completed thus ending the journey
   */
  const endTrip = async () => {
    var endTripPayload = {
      status: 'completed',
      model: 'dispatch',
    };
    // showLoaderButton(loadingButtonRef);
    await dispatch(patchEndTrip(order?.id, endTripPayload)).then((result) => {
      if (result) {
        console.log('ended the parent trip');
        dispatch(getOrder(retrievedId));
      }
    });
    // dismissLoaderButton(loadingButtonRef);
    setHasDataLoaded(true);
  };
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
          {dispatchOrder?.order?.customer?.name || 'No name'}
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
          {getTodaysDate(order?.updatedAt)}
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
          {dispatchOrder?.order?.customer?.address || 'No address'}
        </MontserratSemiBold>

        <MontserratSemiBold
          style={{fontSize: fp(15), color: COLOURS.gray5, marginTop: 17}}>
          Phone Number
        </MontserratSemiBold>
        <MontserratSemiBold
          style={{fontSize: 15, color: COLOURS.textInputColor, marginTop: 4}}>
          {dispatchOrder?.order?.customer?.phoneNumber || 'No phone number'}
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
            onPress={() =>
              dialNumber(dispatchOrder?.order?.customer?.phoneNumber)
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              right: 20,
            }}>
            <CircleImageComponent
              image={IMAGES.call}
              onPress={() =>
                dialNumber(dispatchOrder?.order?.customer?.phoneNumber)
              }
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
    return (
      <>
        {order?.status == 'pending' ? (
          <View style={{marginTop: 30}}>
            <LoaderButtonComponent
              buttonRef={loadingButtonRef}
              title={'Start Trip'}
              method={handleStartRide}
              bgColour={COLOURS.blue}
              radius={30}
            />
          </View>
        ) : null}
        {order?.status == 'started' && dispatchOrder?.status == 'pending' ? (
          <View style={{marginTop: 30}}>
            <LoaderButtonComponent
              buttonRef={loadingButtonRef}
              title={'Mark Complete'}
              method={handleComplete}
              bgColour={COLOURS.blue}
              radius={30}
            />
          </View>
        ) : null}

        {order?.status == 'started' && dispatchOrder?.status == 'completed' ? (
          <View style={{marginTop: 30}}>
            <LoaderButtonComponent
              buttonRef={loadingButtonRef}
              title={
                'Completed ' +
                orderCount +
                ' of ' +
                order?.dispatch_orders.length
              }
              method={handleNothing}
              bgColour={COLOURS.green3}
              radius={30}
            />
          </View>
        ) : null}
        {order?.status == 'completed' &&
        dispatchOrder?.status == 'completed' ? (
          <View style={{marginTop: 30}}>
            <LoaderButtonComponent
              buttonRef={loadingButtonRef}
              title={
                'Completed Batch ' +
                orderCount +
                ' of ' +
                order?.dispatch_orders.length
              }
              method={handleNothing}
              bgColour={COLOURS.green3}
              radius={30}
            />
          </View>
        ) : null}
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
     
        <>
          {renderOrderDetails()}
          {renderActionbuttons()}
          {renderCompleteButtons()}
        </>
 

      <LoaderShimmerComponent isLoading={patchOrderLoading} />
      <LoaderShimmerComponent isLoading={getOrderLoading} />

      {/* {hasDataLoaded ? (
        <LoaderShimmerComponent isLoading={isLoading} />
      ) : (
        <LoaderShimmerComponent isLoading={getOrderLoading} />
      )} */}
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
