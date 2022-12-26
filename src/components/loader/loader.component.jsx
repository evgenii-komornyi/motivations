import React from 'react';
import AnimatedLoader from 'react-native-animated-loader';

import { styles } from '../../styles/globalStyle';

export const Loader = ({ sourceFile }) => {
    return (
        <AnimatedLoader
            visible={true}
            source={sourceFile}
            overlayColor="rgba(255,255,255,0.75)"
            animationStyle={styles.lottie}
            speed={1}
        />
    );
};
