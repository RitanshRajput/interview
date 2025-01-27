import React, { useCallback, useEffect, useRef, useState } from "react";
import "../app.css";
const fetchData = async (start, limit) => {
  const response = new Array(limit).fill(null).map((_, index) => {
    return { id: start + index + 1, label: `Item#${start + index + 1}` };
  });
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), 1000);
  });
};

const InfiniteScrolling = () => {
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const batchSize = 50;

  const listref = useRef(null);

  const loadMoreItems = useCallback(async () => {
    if (isFetching || !hasMore) return;
    const newItems = await fetchData(startIndex, batchSize);
    if (newItems.length < batchSize) {
      setHasMore(false);
    }

    setItems((prevItems) => [...prevItems, ...newItems]);
    setStartIndex(startIndex + batchSize);
    setIsFetching(false);
  }, [startIndex, isFetching, hasMore]);

  useEffect(() => {
    loadMoreItems();
  }, [loadMoreItems]);

  const handleScroll = () => {
    const scrollTop = listref.current.scrollTop;
    const scrollHeight = listref.current.scrollHeight;
    const clientHeight = listref.current.clientHeight;

    if (scrollHeight - scrollTop === clientHeight && hasMore) {
      loadMoreItems();
    }
  };

  const renderItem = ({ index, style }) => {
    const item = items[index];
    return <div className="p-4 border-b border-gray-300">{item ? item.label : "Loading..."}</div>;
  };

  return (
    <div
      className="h-[90vh] overflow-y-auto"
      ref={listref}
      onScroll={handleScroll}
      style={{ padding: "0 10px" }}
    >
      <div style={{ height: items.length * 60 }}>
        {items.map((item, index) => renderItem(item, index))}
      </div>

      {isFetching && hasMore && (
        <div className="flex justify-center mt-4">
          <div className="loader">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrolling;
