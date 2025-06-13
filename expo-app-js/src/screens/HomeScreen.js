import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import colors from '../constants/colors';
import translations from '../translations/ru';

// Sample data for restaurants
const RESTAURANTS = [
  {
    id: '1',
    name: 'Итальянская пиццерия',
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg',
    rating: 4.8,
    deliveryTime: '25-35',
    minOrder: 500,
    freeDelivery: true,
  },
  {
    id: '2',
    name: 'Суши мастер',
    image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    rating: 4.6,
    deliveryTime: '40-50',
    minOrder: 1000,
    freeDelivery: false,
  },
  {
    id: '3',
    name: 'Бургер кинг',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    rating: 4.5,
    deliveryTime: '20-30',
    minOrder: 300,
    freeDelivery: true,
  },
];

// Categories component
const Categories = () => {
  const categories = [
    { id: '1', name: translations.pizza },
    { id: '2', name: translations.sushi },
    { id: '3', name: translations.burger },
    { id: '4', name: translations.asian },
    { id: '5', name: translations.desserts },
  ];

  return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionTitle}>{translations.categories}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Restaurant card component
const RestaurantCard = ({ restaurant }) => (
  <TouchableOpacity style={styles.restaurantCard}>
    <Image
      source={{ uri: restaurant.image }}
      style={styles.restaurantImage}
    />
    <View style={styles.restaurantInfo}>
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <View style={styles.restaurantDetails}>
        <Text style={styles.detailText}>
          ⭐ {restaurant.rating}
        </Text>
        <Text style={styles.detailText}>
          🕒 {restaurant.deliveryTime} {translations.delivery_time}
        </Text>
        {restaurant.freeDelivery && (
          <Text style={[styles.detailText, styles.freeDelivery]}>
            {translations.free_delivery}
          </Text>
        )}
      </View>
      <Text style={styles.minOrder}>
        {translations.min_order}: {restaurant.minOrder} {translations.currency}
      </Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={translations.search_placeholder}
          placeholderTextColor={colors.placeholder}
        />
      </View>

      <FlatList
        data={RESTAURANTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        ListHeaderComponent={() => (
          <>
            <Categories />
            <Text style={[styles.sectionTitle, styles.restaurantsTitle]}>
              {translations.all_restaurants}
            </Text>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    backgroundColor: colors.inputBackground,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  categoriesContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.textPrimary,
  },
  restaurantsTitle: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    backgroundColor: colors.buttonBackground,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: colors.buttonText,
    fontSize: 14,
    fontWeight: '500',
  },
  restaurantCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  restaurantInfo: {
    padding: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  restaurantDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  freeDelivery: {
    color: colors.success,
    fontWeight: '500',
  },
  minOrder: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default HomeScreen;
