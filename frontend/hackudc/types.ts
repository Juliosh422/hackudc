export type RootStackParamList = {
    Home: undefined;
    Results: {
        imageUri: string;
        products: Array<{
            id: string;
            name: string;
            price: {
                currency: string;
                value: {
                    current: number;
                    original?: number;
                };
            };
            link: string;
            brand: string;
        }>;
    };
};