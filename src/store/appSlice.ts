import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Papa from 'papaparse';
import { ISite, ICost, IAppState } from '../types';

export const loadData = createAsyncThunk(
  'app/loadData', async () => {
    try {
      const sitesResponse = await fetch('/working-with-stops/sites.csv');
      const sitesText = await sitesResponse.text();
      
      const sitesData = Papa.parse<ISite>(sitesText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      });

      const costsResponse = await fetch('/working-with-stops/costs.csv');
      const costsText = await costsResponse.text();
      
      const costsData = Papa.parse<ICost>(costsText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      });

      return {
        sites: sitesData.data,
        costs: costsData.data
      };
    } catch (error) {
      throw new Error(`Ошибка загрузки данных: ${error}`);
    }
  }
);

const initialState: IAppState = {
  sites: [],
  costs: [],
  selectedSiteId: null,
  loading: false,
  error: null
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    selectSite: (state, action: PayloadAction<number>) => {
      state.selectedSiteId = action.payload;
    },
    clearSelection: (state) => {
      state.selectedSiteId = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadData.fulfilled, (state, action) => {
        state.loading = false;
        state.sites = action.payload.sites;
        state.costs = action.payload.costs;
      })
      .addCase(loadData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки данных';
      });
  }
});

export const { selectSite, clearSelection, clearError } = appSlice.actions;

export default appSlice.reducer;
