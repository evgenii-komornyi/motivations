import React, { memo } from 'react';
import { Routes, Route } from 'react-router-native';

import { routes } from '../helpers/data.helper';

export const RoutesMap = memo(() => {
    return (
        <Routes>
            {routes.map(({ path, screen }, key) => (
                <Route key={key} path={path} element={screen} />
            ))}
        </Routes>
    );
});
