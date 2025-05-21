'use client';

import { useState, useEffect } from 'react';
import zipCodeData from '../public/zipcode-data.json';

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

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = zipCodeData.filter((item: ZipCodeData) =>
        item.zipCode.startsWith(searchTerm)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
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
