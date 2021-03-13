
export const useListService = () => {
  (async () => { })();

  const getListItems = async (listId: string): Promise<any[]> => {
    try {
      let items: any[] = [];
      //TODO 
      // const response = await API call
      return items;
    } catch (error) {
      throw error;
    }
  };

  return {
    getListItems
  };
};
