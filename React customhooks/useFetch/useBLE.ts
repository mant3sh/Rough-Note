import { useState, useCallback, useRef, useEffect } from "react";

function useBLE(options: any = undefined) {
  const [error, setError] = useState<null | string>("device is not conneceted");
  const [value, setValue] = useState<any>(null);
  const [device, setDevice] = useState<any>(null);

  //   useEffect(() => {
  //     console.log("done mounting");
  //     return () => {
  //       if (device) {
  //         device.removeEventListener(
  //           "gattserverdisconnected",
  //           handleDisconnect
  //         );
  //         if (device.gatt?.connected) {
  //           device.gatt.disconnect();
  //         }
  //       }
  //     };
  //   }, []);
  //   useEffect(() => {
  //     console.log("mounted");

  //     return function () {
  //       console.log("un mounted");
  //       if (device) {
  //         device.gatt.disconnect();
  //       }
  //     };
  //   }, []);

  function handleDisconnect() {
    if (device?.gatt.connected) {
      device.gatt.disconnect();
    }

    setError("device disconnected");
    setDevice(null);
    console.log("disconneceted");
  }
  const defaultOptions: any = {};
  if (options) {
    defaultOptions["filters"] = options ? [...options] : [];
  } else {
    defaultOptions["acceptAllDevices"] = true;
  }
  function handleValueChange(e: any) {
    setValue(e.target.value);
  }
  const getPrimaryService = useCallback(
    async (primary_service_uuid: string, service_uuid: string) => {
      try {
        if (!device.connected) {
          console.error("device is not connected ");
          throw new Error();
        }
        const server = await device.getPrimaryService(primary_service_uuid);
        const characteristic = await server.getCharacteristic(service_uuid);
        characteristic.addEventListener(
          "characteristicvaluechanged",
          handleValueChange
        );
        await characteristic.startNotifications();
      } catch (error: any) {
        setError(error);
      }
    },
    []
  );

  const requestDevice = useCallback(async () => {
    try {
      let ble_device = await navigator.bluetooth.requestDevice(defaultOptions);
      ble_device = await ble_device.gatt.connect();
      ble_device.device.addEventListener(
        "gattserverdisconnected",
        handleDisconnect
      );
      setDevice(ble_device.device);
    } catch (error) {
      setError(`there was problem in connecting with device ${error}`);
    }
  }, [options]);

  return { error, value, getPrimaryService, requestDevice, device };
}

export default useBLE;
