"use client";
import React, { useEffect, useState, useRef, useCallback, memo, lazy, Suspense } from "react";
import { automotive, meeting } from "@/assets";
import Link from "next/link";
import Image from "next/image";
import { H3 } from "../Typography";
import { useSelector } from "react-redux";

const MemoizedLoader = memo(lazy(() => import("../Loader")));
const MemoizedTopBanner = memo(lazy(() => import("@/components/TopBanner")));

const Homes = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const serverurl = process.env.NEXT_PUBLIC_DJANGO_URL;
  const currentPageRef = useRef(1);
  const loader = useRef(null);
  const { user_meta } = useSelector((state) => state.auth);
  const myselectedLanguage = user_meta?.selectedLanguage || "en";

  const fetchCategories = useCallback(async (page = 1) => {
    setIsFetchingMore(true);
    try {
      const response = await fetch(
        `${serverurl}category-count/?page=${page}&page_size=10&language=${myselectedLanguage}`
      );
      const result = await response.json();
      if (response.ok) {
        setCategories((prevCategories) => [...prevCategories, ...result.categories]);
        setTotalPages(result.total_pages);
      } else {
        console.error(result.error || "Failed to fetch categories");
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  }, [serverurl, myselectedLanguage]);

  // Refetch categories on language change
  useEffect(() => {
    setCategories([]); // Clear categories to refetch on language change
    currentPageRef.current = 1; // Reset page count
    setLoading(true); // Set loading to true
    fetchCategories(currentPageRef.current); // Fetch categories for the new language
  }, [fetchCategories, myselectedLanguage]);

  const loadMore = useCallback(() => {
    if (currentPageRef.current < totalPages && !isFetchingMore) {
      currentPageRef.current += 1;
      fetchCategories(currentPageRef.current);
    }
  }, [fetchCategories, isFetchingMore, totalPages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.5 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div>
      <Suspense fallback={<div>Loading banner...</div>}>
        <MemoizedTopBanner
          img={meeting}
          label="Free Listing"
          heading="Business Category"
          btnTxt={<span>+ List your business <strong>for free</strong></span>}
        />
      </Suspense>

      {loading ? (
        <Suspense fallback={<div>Loading...</div>}>
          <MemoizedLoader />
        </Suspense>
      ) : categories.length ? (
        <div className="px-7 py-16 flex gap-x-3 gap-y-5 flex-wrap">
          {categories.map((category) => (
            <div className="flex-[170px] lg:flex-grow-0 lg:w-[19%] lg:flex-[19%] bg-white p-3 rounded-xl" key={category.id}>
              <Link href={`/business/${category.slug}`}>
                <Image
                  src={category.thumbnail ? `${serverurl}media/${category.thumbnail}` : automotive}
                  alt={`${category.name} category`}
                  priority={category === categories[0]}
                  className="rounded-lg w-full aspect-video object-cover"
                  width={300}
                  height={300}
                  decoding="async"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <H3 className="uppercase text-text-color text-base text-center font-semibold mt-4 mb-3">
                  {category.name}
                </H3>
              </Link>
              <Link href={`/business/home/${category.slug}`}>
                <span className="text-text-gray text-base text-center inline-block mb-3 w-full">
                  {`${category.business_count || 0} listings`}
                </span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>No category exists</div>
      )}

      {isFetchingMore && (
        <div className="flex items-center justify-center mt-4">
          <Suspense fallback={<div>Loading more...</div>}>
            <MemoizedLoader />
          </Suspense>
        </div>
      )}
      <div ref={loader}></div>
    </div>
  );
};

export default Homes;
