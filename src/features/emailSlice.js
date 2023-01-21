import { createSlice } from '@reduxjs/toolkit'

// Array of objects (100 dummy records)
import DATA from '../MOCK_DATA.json'

const initialState = {
  data: DATA ? DATA : [],
  selectedItems: [],
  isLoading: false,
  currentPage: 1,
  itemsPerPage: 50,
  totalItems: DATA ? DATA.length : 0,
}

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    getItems: (state, action) => {
      state.isLoading = true

      // Logic
      const startIndex = (state.currentPage - 1) * state.itemsPerPage
      const endIndex = startIndex + state.itemsPerPage

      state.data = DATA.slice(startIndex, endIndex)

      state.isLoading = false
    },
    setCurrentPage: (state, action) => {
      state.isLoading = true
      state.currentPage = action.payload
      // Logic
      const startIndex = (state.currentPage - 1) * state.itemsPerPage
      const endIndex = startIndex + state.itemsPerPage

      state.data = DATA.slice(startIndex, endIndex)

      state.isLoading = false
    },

    // Store the selected items
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
        console.log('removed')
      } else {
        state.selectedItems.push(selectedCheckbox)
        console.log('added')
      }
    },
    // Delete selected items
    deleteItem: (state, action) => {
      state.isLoading = true
      const selectedCheckBoxes = action.payload

      selectedCheckBoxes.forEach((element) => {
        state.data = state.data.filter((item) => item.id != element)
      })

      state.selectedItems = []

      state.isLoading = false
    },
  },
})

export const { getItems, setCurrentPage, deleteItem, selectItem } =
  emailSlice.actions
export default emailSlice.reducer
