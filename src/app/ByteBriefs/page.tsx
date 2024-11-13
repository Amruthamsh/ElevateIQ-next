'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

interface Article {
  urlToImage: string;
  title: string;
  url: string;
  description: string;
  author: string;
  publishedAt: string;
}

const NewsPage: React.FC = () => {
  const [latestNews, setLatestNews] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiKey = "df783de3e07940ec9397fc7814b48ddc"; // Replace with your actual News API key

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=mechanical%20OR%20engineering%20OR%20companies%20OR%20technology%20OR%20industry&apiKey=${apiKey}`
        );

        const filteredArticles = response.data.articles.filter(
          (article: Article) => article.title && article.urlToImage
        );

        setLatestNews(filteredArticles);
      } catch (error) {
        console.error("Error fetching the news:", error);
        setError("Failed to fetch news.");
      }
    };

    fetchNews();
  }, [apiKey]);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <div>

      <div className="relative bg-gray w-full h-auto overflow-hidden text-left text-base text-lavenderblush-300 font-poppins">
        <div className="py-5 text-center text-3xl md:text-5xl">
          <h1>LATEST NEWS & UPDATES</h1>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {latestNews.map((news, index) => (
            <div key={index} className="relative bg-[#6A7B8C] text-black rounded-lg shadow-lg overflow-hidden">
              <img
                className="w-full h-48 object-cover"
                src={news.urlToImage}
                alt={news.title}
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{news.title}</h2>
                <p className="text-sm text-gray-400">By: {news.author || "Unknown"}</p>
                <p className="text-sm text-gray-400">Published: {formatDate(news.publishedAt)}</p>
                <p className="mt-2">{news.description}</p>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-white inline-flex items-center"
                >
                  Show More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    className="w-6 h-6 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
