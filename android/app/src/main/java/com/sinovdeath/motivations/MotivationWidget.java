package com.sinovdeath.motivations;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.widget.RemoteViews;

import com.sinovdeath.motivations.services.Motivation;
import com.sinovdeath.motivations.services.WidgetService;

public class MotivationWidget extends AppWidgetProvider {

    private static final String ACTION_CLICK = "ACTION_CLICK";

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId, int[] appWidgetIds) {
        RemoteViews remoteViews = new RemoteViews(context.getPackageName(),
                R.layout.motivation_widget);

        Motivation motivation = WidgetService.getItemFromStorage(context);
        String motivationText = motivation.title;
        String motivationCategory = motivation.category;

        if (motivationText.isEmpty()) {
            remoteViews.setTextViewText(R.id.update, context.getString(R.string.appwidget_text));
        } else {
            remoteViews.setTextViewText(R.id.update, motivationText);

            Bitmap bmp = WidgetService.getImageByCategory(motivationCategory, context);

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