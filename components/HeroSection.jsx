'use client';
import {
    Box,
    
    IconButton,
    InputBase,
    Paper,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Image from 'next/image';
import { house } from '@/assets';

import React, { useEffect, useState } from "react";

import Select from "react-select";
import {
    CitySelect, StateSelect
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const HeroSection = ({ handleSearch, countryid, setstateid, setSelectedCity, setSelectedState, setZip, stateid, zip }) => (
    <Box sx={{ position: 'relative', height: 500 }}>
        <Image
            src={house}
            alt="Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
        />
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
            }}
        >
            <Typography variant="h4" fontWeight={700} mb={2}>
                Search properties for sale in Pakistan
            </Typography>
            <Tabs centered value={0} textColor="inherit" indicatorColor="primary" sx={{ mb: 2 }}>
                <Tab label="BUY" sx={{ fontWeight: 'bold', fontSize: 16 }} />
                <Tab label="RENT" sx={{ fontWeight: 'bold', fontSize: 16 }} />
                <Tab label="PROJECTS" sx={{ fontWeight: 'bold', fontSize: 16 }} />
            </Tabs>
            <Paper
  component="form"
  onSubmit={handleSearch}
  sx={{
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    maxWidth: 770,
    mt: 2,
    padding: '6px',
    boxShadow: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
  }}
>
  <div
    className="flex flex-wrap gap-4 items-center w-full"
  >
<div className="flex-1 min-w-[250px] max-w-[300px]">
  <StateSelect
    required
    countryid={countryid}
    onChange={(e) => {
      setstateid(e.id);
      setSelectedCity('');
      setSelectedState(e.name);
    }}
    placeHolder="Select State"
    inputClassName="no-border text-sm font-inter w-full"  // Apply no-border class here
    style={{ border: 'none', outline: 'none', boxShadow: 'none' }} // Forcefully remove borders
  />
</div>


    <div className="flex-1 min-w-[250px] max-w-[300px]">
      <CitySelect
        required
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => setSelectedCity(e.name)}
        placeHolder="Select City"
        inputClassName="outline-none shadow-formFeilds text-sm font-inter w-full"
        style={{ border: 'none', outline: 'none', boxShadow: 'none' }} // Forcefully remove borders

      />
    </div>

    <div className="flex-1 min-w-[150px] max-w-[200px]">
      <InputBase
        placeholder="Zip Code"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        sx={{
          ml: 1,
          flex: 1,
        }}
        startAdornment={<LocationOnIcon sx={{ mr: 1 }} />}
        style={{ borderRadius: '5px',height: "40px", border: "1.5px solid #c9ccd0",    borderColor: "#cccccc"}} // Forcefully remove borders

      />
    </div>

    <div className="flex-shrink-0">
      <IconButton
        type="submit"
        sx={{
          width: 40,
          height: 40,
          backgroundColor: 'green',
          color: '#fff',
          '&:hover': { backgroundColor: '#005f00' },
        }}
      >
        <SearchIcon />
      </IconButton>
    </div>
  </div>
</Paper>

        </Box>
    </Box>
);

export default HeroSection;