export type RootStackParamList = {
    Home: undefined; // No parameters expected for the Home screen
    Results: { imageUri: string | null; text: string }; // Parameters expected for the Results screen
};