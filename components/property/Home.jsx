'use client';
import {
    Box,
   
    CircularProgress,
   
    Grid,
  
    Typography,
} from '@mui/material';

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "react-country-state-city/dist/react-country-state-city.css";
import SubProperties from '@/components/SubProperties';
import PropertyCarousel from '@/components/PropertyCarousel';
import HeroSection from '@/components/HeroSection';
import SearchCarousel from '@/components/SearchCarousel';
export default function PropertyHome() {
    const serverurl = process.env.NEXT_PUBLIC_DJANGO_URL

    const [loading, setLoading] = useState();
    const [type, setType] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [properties, setProperties] = useState([]);

    const [newproperties, setnewProperties] = useState([]);
    const { user_meta } = useSelector((state) => state.auth);
    const [viewproperties, setviewProperties] = useState([]);
    const countryid = 233;
    const selectedLanguage = user_meta.selectedLanguage || 'en';
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate a data fetch; update this logic based on your actual data fetching mechanism
      if (properties && viewproperties) {
        setIsLoading(false);
      }
    }, [properties, viewproperties]);
    const filteredItems = Array.isArray(type)
        ? type.filter((item) =>
            item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
        )
        : [];
    useEffect(() => {
        // if (!user || !user.id) {
        //   router.push("/");
        //   return;
        // }
        const fetchTypes = async () => {
            try {
                let response;
                const headers = { 'Content-Type': 'application/json' };
                const url = `${serverurl}get-type/`;

                const options = {
                    method: 'POST',
                    headers,

                };

                response = await fetch(url, options);

                const result = await response.json();

                if (response.ok) {

                    setType(result.types);




                } else {
                    setError(result.error || 'Failed to fetch businesses');
                }
            }
            catch (error) {
                setError('An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTypes();
    }, []);

    const truncateText = (text, maxChars) => {
        return text.length > maxChars ? text.slice(0, maxChars) + '...' : text;
    };

    useEffect(() => {
        const fetchProperties = async () => {
            const formData = {
                language: selectedLanguage,
            };
            try {
                const response = await fetch(`${serverurl}get-allfeaturedproperties/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(formData),
                });
                const result = await response.json();
                if (response.ok) {

                    setProperties(result.data);
                } else {
                    console.error(result.error || 'Failed to fetch categories');
                }
            } catch (error) {
                console.error('An unexpected error occurred', error);
            }

            try {
                const response2 = await fetch(`${serverurl}get-mostviewed/`,{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(formData),
                });
                const result2 = await response2.json();
                if (response2.ok) {

                    setviewProperties(result2);
                } else {
                    console.error(result2.error || 'Failed to fetch categories');
                }
            } catch (error) {
                console.error('An unexpected error occurred', error);
            }



            finally {
                setLoading(false);
            }
        };

        fetchProperties();

    }, [selectedLanguage]); // Fetch data when language or filters change


 
    const [stateid, setstateid] = useState(0);
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [zip, setZip] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = {
            state: selectedState,
            city: selectedCity,
            zip: zip,
        };
        try {
            const response = await fetch(`${serverurl}get-searchstateproperties/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log("result", result.data.length)

            if (result.ErrorCode === 0) {
                setnewProperties(result.data);
            }

            else {

            }

        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };


    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            {/* Hero Section */}
            <HeroSection
            handleSearch={handleSearch}
            countryid={countryid}
            setstateid={setstateid}
            setSelectedCity={setSelectedCity}
            setSelectedState={setSelectedState}
            setZip={setZip}
            stateid={stateid}
            zip={zip}
        />

       
        {newproperties.length > 0 && (
<>
                    <Typography variant="h5" sx={{ marginBottom: 0, marginLeft: 5,marginTop: 5, fontWeight: 600 }}>
                        Searched Properties
                    </Typography>
                   <SearchCarousel properties={newproperties} serverurl={serverurl} />
                   </>
            ) }


<SubProperties filteredItems={filteredItems} />
<Box sx={{ padding: '40px' }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {properties && properties.length > 0 && (
            <>
              <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
                Featured Properties
              </Typography>
              <PropertyCarousel properties={properties} serverurl={serverurl} />
            </>
          )}
          {viewproperties && viewproperties.length > 0 && (
            <>
              <Typography variant="h5" sx={{ marginTop: 5, marginBottom: 2, fontWeight: 600 }}>
                Most Viewed Properties
              </Typography>
              <PropertyCarousel properties={viewproperties} serverurl={serverurl} />
            </>
          )}
        </>
      )}
    </Box>

                
         
           
        </Box>
    );
}

// Reusable Property Card Component