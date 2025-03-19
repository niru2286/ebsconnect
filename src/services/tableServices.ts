import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface TableDataHookProps {
    apiUrl: string;
    method?: "GET" | "POST";
    requestData?: any;
    config?: AxiosRequestConfig;
  }
  
  /**
   * Custom Hook for fetching API data (supports GET & POST)
   */
  const useTableData = ({ apiUrl, method = "GET", requestData = {}, config = {} }: TableDataHookProps) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [searchText, setSearchText] = useState<string>("");
  
    useEffect(() => {
      fetchData();
    }, [apiUrl, method, JSON.stringify(requestData)]);
    
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const response =
          method === "POST"
            ? await axios.post(apiUrl, requestData, config)
            : await axios.get(apiUrl, config);
  
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Global Search Functionality
    const handleSearch = (value: string) => {
      setSearchText(value);
  
      const filtered = data.filter((item) =>
        Object.values(item).some(
          (field) =>
            field &&
            field.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
  
      setFilteredData(filtered);
    };
  
    return { data: filteredData, loading, handleSearch };
  };
  
  export default useTableData;