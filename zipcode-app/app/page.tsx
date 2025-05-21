'use client';

import { useState, useEffect } from 'react';

interface ZipCodeData {
  zipCode: string;
  prefecture: string;
  city: string;
  street: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<ZipCodeData[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<ZipCodeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/zipcode?q=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error('検索に失敗しました');
        }
        const data = await response.json();
        setSuggestions(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSelect = (address: ZipCodeData) => {
    setSelectedAddress(address);
    setSearchTerm(address.zipCode);
    setSuggestions([]);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">郵便番号検索</h1>
        
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="郵便番号を入力（例：1000001）"
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {error && (
            <div className="mt-2 text-red-500 text-sm">{error}</div>
          )}
          
          {suggestions.length > 0 && (
            <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(suggestion)}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion.zipCode} - {suggestion.prefecture}{suggestion.city}{suggestion.street}
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedAddress && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">住所情報</h2>
            <div className="space-y-2">
              <p><span className="font-medium">郵便番号：</span>{selectedAddress.zipCode}</p>
              <p><span className="font-medium">都道府県：</span>{selectedAddress.prefecture}</p>
              <p><span className="font-medium">市区町村：</span>{selectedAddress.city}</p>
              <p><span className="font-medium">町域：</span>{selectedAddress.street}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 
