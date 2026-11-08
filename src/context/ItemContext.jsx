import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { INITIAL_ITEMS } from "../data/sampleData";
import { useAuth } from "./AuthContext";

import {
  getItems,
  createItem,
  updateItem as apiUpdateItem,
  deleteItem as apiDeleteItem,
  updateItemStatus as apiUpdateItemStatus,
} from "../services/api";

const ItemContext = createContext();

const STORAGE_KEY = "reclaim_items_data";

const USE_AWS_BACKEND =
  import.meta.env.VITE_USE_AWS_BACKEND === "true";


export function ItemProvider({ children }) {

  const { currentUser, usersList, loading: authLoading } = useAuth();

  // ==================================================
  // INITIAL STATE
  // ==================================================

  const [items, setItems] = useState(() => {

    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        return JSON.parse(saved);
      }

    } catch (error) {
      console.error("Local storage error:", error);
    }

    return INITIAL_ITEMS;
  });

  const [itemsLoading, setItemsLoading] = useState(false);


  // ==================================================
  // SAVE LOCAL DATA
  // ==================================================

  useEffect(() => {

    if (!USE_AWS_BACKEND) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    }

  }, [items]);


  // ==================================================
  // LOAD ITEMS FROM AWS
  // ==================================================

  useEffect(() => {

    if (!USE_AWS_BACKEND || authLoading || !currentUser) {
      return;
    }

    let cancelled = false;

    const loadItems = async () => {

      setItemsLoading(true);

      try {

        const awsItems = await getItems();

        if (!cancelled && Array.isArray(awsItems)) {
          setItems(awsItems);
        }

      } catch (error) {

        console.error("Failed to load AWS items:", error);

      } finally {

        if (!cancelled) {
          setItemsLoading(false);
        }

      }
    };

    loadItems();

    return () => {
      cancelled = true;
    };

  }, [currentUser, authLoading]);


  // ==================================================
  // GET SINGLE ITEM
  // ==================================================

  const getItem = (id) => {

    return items.find(
      (item) => item.id === id
    );

  };


  // ==================================================
  // GET USER ITEMS
  // ==================================================

  const getUserItems = (userId) => {

    return items.filter(
      (item) => item.postedBy === userId
    );

  };


  // ==================================================
  // ADD NEW ITEM
  // ==================================================

  const addItem = async (itemData) => {

    const newItemData = {
      ...itemData,

      status: "AVAILABLE",

      contactName:
        itemData.contactName ||
        currentUser?.name ||
        "Campus Reporter",

      contactPhone:
        itemData.contactPhone ||
        currentUser?.phone ||
        "",

      contactEmail:
        itemData.contactEmail ||
        currentUser?.email ||
        "",
    };


    // AWS MODE
    if (USE_AWS_BACKEND) {

      const createdItem = await createItem(newItemData);

      if (!createdItem) {
        throw new Error("Failed to create item in AWS.");
      }

      setItems((prev) => [
        createdItem,
        ...prev,
      ]);

      return createdItem;
    }


    // LOCAL MODE
    const newItem = {
      ...newItemData,

      id: `item_${Date.now()}`,

      postedBy: currentUser?.id || "usr_anonymous",

      createdAt: new Date().toISOString(),
    };

    setItems((prev) => [
      newItem,
      ...prev,
    ]);

    return newItem;

  };


  // ==================================================
  // UPDATE ITEM
  // ==================================================

  const updateItem = async (id, updatedFields) => {

    // AWS MODE
    if (USE_AWS_BACKEND) {

      const updatedItem = await apiUpdateItem(
        id,
        updatedFields
      );

      if (!updatedItem) {
        throw new Error("Failed to update item.");
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? updatedItem : item
        )
      );

      return updatedItem;
    }


    // LOCAL MODE
    let updatedItem = null;

    setItems((prev) =>
      prev.map((item) => {

        if (item.id === id) {

          updatedItem = {
            ...item,
            ...updatedFields,
            updatedAt: new Date().toISOString(),
          };

          return updatedItem;
        }

        return item;
      })
    );

    return updatedItem;

  };


  // ==================================================
  // DELETE ITEM
  // ==================================================

  const deleteItem = async (id) => {

    // AWS MODE
    if (USE_AWS_BACKEND) {

      await apiDeleteItem(id);

      setItems((prev) =>
        prev.filter((item) => item.id !== id)
      );

      return true;
    }


    // LOCAL MODE
    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );

    return true;

  };


  // ==================================================
  // UPDATE ITEM STATUS
  // ==================================================

  const updateStatus = async (id, newStatus) => {

    // AWS MODE
    if (USE_AWS_BACKEND) {

      const updatedItem = await apiUpdateItemStatus(
        id,
        newStatus
      );

      if (!updatedItem) {
        throw new Error("Failed to update item status.");
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? updatedItem : item
        )
      );

      return updatedItem;
    }


    // LOCAL MODE
    setItems((prev) =>
      prev.map((item) => {

        if (item.id === id) {

          return {
            ...item,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          };

        }

        return item;
      })
    );

  };


  // ==================================================
  // RESET TO DEFAULTS
  // ==================================================

  const resetToDefaults = () => {

    if (USE_AWS_BACKEND) {
      console.warn(
        "Reset is disabled in AWS mode. Cloud items are not modified."
      );

      return;
    }

    setItems(INITIAL_ITEMS);

    localStorage.removeItem(STORAGE_KEY);

  };


  // ==================================================
  // DASHBOARD STATISTICS
  // ==================================================

  const getStats = () => {

    const totalItems = items.length;

    const availableCount = items.filter(
      (item) => item.status === "AVAILABLE"
    ).length;

    const claimedCount = items.filter(
      (item) => item.status === "CLAIMED"
    ).length;

    const returnedCount = items.filter(
      (item) => item.status === "RETURNED"
    ).length;

    const myPostsCount = currentUser
      ? items.filter(
        (item) => item.postedBy === currentUser.id
      ).length
      : 0;

    const totalUsers = usersList.length;

    return {
      totalItems,
      availableCount,
      claimedCount,
      returnedCount,
      myPostsCount,
      totalUsers,
    };

  };


  // ==================================================
  // CONTEXT PROVIDER
  // ==================================================

  return (

    <ItemContext.Provider
      value={{
        items,
        itemsLoading,

        getItem,
        getUserItems,

        addItem,
        updateItem,
        deleteItem,
        updateStatus,

        resetToDefaults,
        getStats,
      }}
    >

      {children}

    </ItemContext.Provider>

  );

}


// ==================================================
// CUSTOM HOOK
// ==================================================

export function useItems() {

  const context = useContext(ItemContext);

  if (!context) {
    throw new Error(
      "useItems must be used within an ItemProvider"
    );
  }

  return context;

}