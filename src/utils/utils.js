export function handleBackPress() {
  const backAction = () => {
    Alert.alert("Zupa Rider", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
}

export const validatePassword = (password) => {
  const pass = /^[a-zA-Z0-9.,\\s]{3,40}$/;
  if (pass.test(password) === false) {
    Alert.alert("Invalid password character/s");
    return false;
  }
  return true;
};

export const validateNumber = (number) => {
  const num = /[0-9]{1,11}$/;
  if (num.test(number) === false) {
    Alert.alert("Invalid number character/s");
    return false;
  }

  return true;
};

export const validateEmail = (email) => {
  const emailadd = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailadd.test(email) === false) {
    //alert("Invalid email character/s");
    return false;
  }
  if (email.length !== 0 && email.length >= 4) {
  }
  return true;
};
export const checkNetworkConnection = (setisNetworkAvailable) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      //console.log("Is connected?", state.isConnected);
      setisNetworkAvailable(state.isConnected);
    });
    return () => {
      if (unsubscribe != null) unsubscribe();
    };
  }, []);
};

export const handleError = (error) => {
  if (
    error == "TypeError: Network request failed" ||
    error == "Network request failed"
  ) {
    alert("Network error, please try again");
  }
};

export function getReadableDateAndTime(stringDate) {
  var currDate = new Date();
  var diffMs = currDate.getTime() - new Date(stringDate).getTime();
  var sec = diffMs / 1000;
  if (sec < 60)
    return parseInt(sec) + " second" + (parseInt(sec) > 1 ? "s" : "") + " ago";
  var min = sec / 60;
  if (min < 60)
    return parseInt(min) + " minute" + (parseInt(min) > 1 ? "s" : "") + " ago";
  var h = min / 60;
  if (h < 24)
    return parseInt(h) + " hour" + (parseInt(h) > 1 ? "s" : "") + " ago";
  var d = h / 24;
  if (d < 30)
    return parseInt(d) + " day" + (parseInt(d) > 1 ? "s" : "") + " ago";
  var m = d / 30;
  if (m < 12)
    return parseInt(m) + " month" + (parseInt(m) > 1 ? "s" : "") + " ago";
  var y = m / 12;
  return parseInt(y) + " year" + (parseInt(y) > 1 ? "s" : "") + " ago";
}

export const getTodaysDate = () => {
  var dateFormat = require("dateformat");
  var now = new Date();

  // Basic usage
  return dateFormat(now, "dS mmmm, yyyy");
};
