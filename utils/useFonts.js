// useFonts.js
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

const useFonts = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            await Font.loadAsync({
                'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
                'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
                // Adicione outras variações da fonte Roboto se necessário
            });
            setFontsLoaded(true);
        })();
    }, []);

    return fontsLoaded;
};

export default useFonts;
