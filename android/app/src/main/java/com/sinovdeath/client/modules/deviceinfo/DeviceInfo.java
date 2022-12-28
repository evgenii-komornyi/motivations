package com.sinovdeath.client.modules.deviceinfo;

import android.annotation.SuppressLint;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DeviceInfo extends ReactContextBaseJavaModule {
    ReactApplicationContext _context;

    public DeviceInfo(ReactApplicationContext context) {
        super(context);
        _context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "DeviceInfoOwn";
    }

    @ReactMethod
    public void getPhoneID(Promise response) {
        try {
            @SuppressLint("HardwareIds")
            String id = Settings.Secure.getString(_context.getContentResolver(),
                                                Settings.Secure.ANDROID_ID);
            response.resolve(id);
        } catch (Exception e) {
            response.reject("Error", e);
        }
    }
}
