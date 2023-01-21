import { createSlice } from '@reduxjs/toolkit'

import DATA from '../MOCK_DATA.json'

const initialState = {
  data: DATA ? DATA : [],
  selectedItems: [],
  isLoading: false,
}

export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
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
      state.isLoading = false
    },
  },
})

export const { deleteItem, selectItem } = emailSlice.actions
export default emailSlice.reducer
