import { createSlice } from '@reduxjs/toolkit'

// Array of objects (100 dummy records)
import DATA from '../MOCK_DATA.json'

/*
 * data @array <main data of 100 objects>
 * selectedItems @array <store the selected checkboxes>
 * isLoading @boolean <check if processing>
 * currentPage @int <current paginated page>
 * itemsPerPage @int <data per page (50 default)>
 * totalItems @int <length of data>
 * deletedItems @array <removed emails from state>
 */

const initialState = {
  data: DATA ? DATA : [],
  selectedItems: [],
  isLoading: false,
  currentPage: 1,
  itemsPerPage: 50,
  totalItems: DATA ? DATA.length : 0,
  deletedItems: [],
}

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    // Load Items From State
    getItems: (state, action) => {
      state.isLoading = true

      // Logic
      const startIndex = (state.currentPage - 1) * state.itemsPerPage
      const endIndex = startIndex + state.itemsPerPage

      state.data = DATA.slice(startIndex, endIndex)

      state.isLoading = false
    },
    // Change The Page and Data
    setCurrentPage: (state, action) => {
      state.isLoading = true
      state.currentPage = action.payload

      // Logic
      const startIndex = (state.currentPage - 1) * state.itemsPerPage
      const endIndex = startIndex + state.itemsPerPage

      let newData = DATA

      // Remove the dedleted items from the paginated data
      state.deletedItems.forEach((deletedItem) => {
        newData = newData.filter((data) => data.id !== deletedItem)
      })

      state.data = newData.slice(startIndex, endIndex)

      state.isLoading = false
    },

    // Store the selected checkboxes items
    selectItem: (state, { payload }) => {
      const selectedCheckbox = payload.value
      const doesExist = state.selectedItems.find(
        (item) => item == selectedCheckbox
      )

      // Check if user unchecks the box
      if (!payload.checked && (doesExist != null || doesExist != undefined)) {
        // Remove from selected checkboxes
        state.selectedItems = state.selectedItems.filter(
          (item) => item != selectedCheckbox
        )
        console.log('unchecked')
      } else {
        state.selectedItems.push(selectedCheckbox)
        console.log('checked')
      }
    },
    // Delete the selected items
    deleteItem: (state, action) => {
      state.isLoading = true
      const selectedCheckBoxes = action.payload

      selectedCheckBoxes.forEach((element) => {
        state.data = state.data.filter((item) => item.id != element)
      })

      // Store the deleted items so we can track it when page changes
      state.deletedItems = selectedCheckBoxes

      state.selectedItems = []

      state.isLoading = false
    },
  },
})

export const { getItems, setCurrentPage, deleteItem, selectItem } =
  emailSlice.actions
export default emailSlice.reducer
