import {create} from 'zustand';

const useDataTypeStore = create(set => ({
  dataType: 'isBuku',
  setDataType: type => set({dataType: type}),
}));

export default useDataTypeStore;
