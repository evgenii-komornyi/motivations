package com.sinovdeath.client.modules.cache_cleaner;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

public class CacheCleaner extends ReactContextBaseJavaModule {
    ReactApplicationContext _context;

    public CacheCleaner(ReactApplicationContext context) {
        super(context);
        _context = context;
    }

    @NonNull
    @Override
    public String getName() { return "CacheCleaner"; }

    @ReactMethod
    public void deleteCache(Promise response) {
        try {
            File dir = _context.getCacheDir();

            boolean isDeleted = deleteDir(dir);

            response.resolve(isDeleted);
        } catch (Exception e) {
            response.reject("Error", e);
        }
    }

    private boolean deleteDir(File dir) {
        if (dir != null && dir.isDirectory()) {
            String[] children = dir.list();
            for (int i = 0; i < children.length; i++) {
                boolean success = deleteDir(new File(dir, children[i]));
                if (!success) {
                    return false;
                }
            }
            return dir.delete();
        } else if(dir!= null && dir.isFile()) {

            return dir.delete();
        } else {
            return false;
        }
    }
}
