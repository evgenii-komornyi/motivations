package com.sinovdeath.client;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.res.AssetManager;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.util.Log;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.RemoteViews;

import com.sinovdeath.client.services.Motivation;
import com.sinovdeath.client.services.WidgetService;

import java.io.IOException;
import java.io.InputStream;

public class MotivationWidget extends AppWidgetProvider {

    private static final String ACTION_CLICK = "ACTION_CLICK";

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId, int[] appWidgetIds) {
        RemoteViews remoteViews = new RemoteViews(context.getPackageName(),
                R.layout.motivation_widget);

        AssetManager am = context.getAssets();
        String[] fileList = null;
        String file = null;

        try {
            fileList = am.list("backgrounds");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        if (fileList != null)
        {
            for ( int i = 0;i<fileList.length;i++)
            {
                Log.d("backgrounds", fileList[i].split("\\.")[0]);
            }
        }

        Motivation motivation = WidgetService.getItemFromStorage(context);
        String motivationText = motivation.title;
        String motivationCategory = motivation.category;

        if (motivationText.isEmpty()) {
            remoteViews.setTextViewText(R.id.update, context.getString(R.string.appwidget_text));
        } else {
            remoteViews.setTextViewText(R.id.update, motivationText);
            InputStream is = null;
            try {
                is = context.getAssets().open("backgrounds/" + motivationCategory + ".jpg");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            Bitmap bmp = BitmapFactory.decodeStream(is);

            remoteViews.setImageViewBitmap(R.id.imageView, bmp);
        }

        Intent intent = new Intent(context, MotivationWidget.class);

        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds);

        PendingIntent pendingIntent = PendingIntent.getBroadcast(context,
                0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        remoteViews.setOnClickPendingIntent(R.id.update, pendingIntent);
        appWidgetManager.updateAppWidget(appWidgetId, remoteViews);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId, appWidgetIds);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}