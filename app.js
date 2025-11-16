import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { Database, Plane, Settings, User, LayoutGrid, Star, Info, Users, Palette, Trees, ShoppingCart, Landmark, Map, CalendarDays, Search, AlertTriangle, Clock, MapPin, PoundSterling, Ticket, Phone, Siren, Zap, Bus, Globe, Plug, Flag, ShieldCheck } from 'lucide-react'; // Added Plug, Flag, ShieldCheck icons

// --- Global Configuration ---
// Color based on uploaded CWP Colour Pantone (R: 0, G: 35, B: 102)
const PRIMARY_COLOR = '#002366'; 
const ACCENT_COLOR = '#00C853'; // Bright green for highlights

// Firebase Setup (Required for Canvas Environment)
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Mock Data focused on London
const initialCityProjects = [
    { id: 101, name: "Elizabeth Line Phase 2", location: "Paddington to Abbey Wood", status: "Active", type: "Transportation", image: "https://placehold.co/400x200/5E35B1/FFFFFF?text=Elizabeth+Line" },
    { id: 102, name: "Battersea Power Station Regeneration", location: "Nine Elms, SW8", status: "Completed", type: "Housing/Mixed Use", image: "https://placehold.co/400x200/FF6F00/FFFFFF?text=Battersea+Regen" },
    { id: 103, name: "Thames Tideway Tunnel", location: "Central London", status: "Under Construction", type: "Infrastructure", image: "https://placehold.co/400x200/00838F/FFFFFF?text=Tideway+Tunnel" },
];

const initialAirports = [
    { id: 1, name: "Heathrow Int'l", code: "LHR", city: "London", country: "UK", type: "Hub", image: "https://placehold.co/400x200/002366/FFFFFF?text=LHR" },
    { id: 2, name: "Gatwick Airport", code: "LGW", city: "Crawley (Greater London Area)", country: "UK", type: "International", image: "https://placehold.co/400x200/4CAF50/FFFFFF?text=LGW" },
    { id: 3, name: "London City Airport", code: "LCY", city: "East London", country: "UK", type: "Business", image: "https://placehold.co/400x200/D81B60/FFFFFF?text=LCY" },
];

// --- LONDON GUIDES DATA ---
const londonLandmarks = [
    { id: 1, name: "The British Museum", description: "A world-famous museum dedicated to human history, art, and culture. Contains over 8 million works, including the Rosetta Stone and Parthenon sculptures.", image: "https://placehold.co/400x200/4CAF50/FFFFFF?text=BRITISH+MUSEUM", times: "10:00 - 17:00 (Fridays open until 20:30)", travel: "Nearest Underground: Tottenham Court Road, Holborn, Russell Square. Bus: Routes 1, 8, 19, 25, 38, 55, 98, 242.", admission: "Free (special exhibitions may require a fee)" },
    { id: 2, name: "The Tower of London", description: "Historic castle on the north bank of the River Thames. Famous for housing the Crown Jewels and its dark history as a prison.", image: "https://placehold.co/400x200/D32F2F/FFFFFF?text=TOWER+OF+LONDON", times: "09:00 - 17:30 (varies by season)", travel: "Nearest Underground: Tower Hill (District & Circle lines). DLR: Tower Gateway. Bus: Routes 15, 42, 78, 100, 343.", admission: "Approx. £33.60 (Adult, online booking recommended)" },
    { id: 3, name: "The London Eye", description: "Europe's tallest cantilevered observation wheel, offering breathtaking 360-degree views of the capital.", image: "https://placehold.co/400x200/0288D1/FFFFFF?text=LONDON+EYE", times: "11:00 - 18:00 (may extend in peak season)", travel: "Nearest Underground: Waterloo (Bakerloo, Jubilee, Northern, Waterloo & City lines). Bus: Routes 211, 77, 381.", admission: "Starts from approx. £35.00 (Standard Ticket)" },
    { id: 4, name: "Buckingham Palace", description: "The official London residence and administrative headquarters of the monarch of the United Kingdom.", image: "https://placehold.co/400x200/FFAB00/000000?text=BUCKINGHAM+PALACE", times: "State Rooms open seasonally (usually July-September): 09:30 - 19:30.", travel: "Nearest Underground: Green Park, St. James's Park, Victoria. Bus: Routes 11, 211, C1, C10, M2.", admission: "Approx. £30.00 (Access to State Rooms, check availability)" },
];

const londonAttractions = [
    { id: 11, name: "Warner Bros. Studio Tour London", description: "The Making of Harry Potter: a behind-the-scenes look at the film series, featuring authentic sets, costumes, and props.", image: "https://placehold.co/400x200/9C27B0/FFFFFF?text=HARRY+POTTER+TOUR", times: "09:00 - 20:00 (Booking essential)", travel: "Train to Watford Junction, then shuttle bus (outside central London).", admission: "Approx. £53.50 (Adult, varies by season)" },
    { id: 12, name: "The Shard", description: "The tallest building in the UK, offering an observation deck with panoramic 40-mile views across London and beyond.", image: "https://placehold.co/400x200/512DA8/FFFFFF?text=THE+SHARD", times: "10:00 - 22:00 (Check website for specific times)", travel: "Nearest Underground: London Bridge (Jubilee & Northern lines).", admission: "Approx. £32.00 (Adult, advance booking recommended)" },
    { id: 13, name: "Trafalgar Square", description: "Famous public square in central London, home to Nelson's Column, the National Gallery, and often host to public events and celebrations.", image: "https://placehold.co/400x200/FBC02D/000000?text=TRAFALGAR+SQUARE", times: "Open 24 hours (National Gallery has fixed hours)", travel: "Nearest Underground: Charing Cross, Leicester Square.", admission: "Free (public space)" },
    { id: 14, name: "Natural History Museum", description: "World-renowned museum exhibiting a vast range of specimens from various segments of natural history, including the famous dinosaur skeletons.", image: "https://placehold.co/400x200/004D40/FFFFFF?text=NAT+HISTORY+MUSEUM", times: "10:00 - 17:50 (Daily)", travel: "Nearest Underground: South Kensington (District, Circle, Piccadilly lines).", admission: "Free (ticket required for entry)" },
];

const londonFamilyOutings = [
    { id: 21, name: "Science Museum", description: "Explore world-renowned collections and interactive exhibits focused on scientific and technological developments. Great for kids of all ages.", image: "https://placehold.co/400x200/F44336/FFFFFF?text=SCIENCE+MUSEUM", times: "10:00 - 18:00 (Daily)", travel: "Nearest Underground: South Kensington (District, Circle, Piccadilly lines).", admission: "Free (Charge for IMAX theatre and some special exhibitions)" },
    { id: 22, name: "London Zoo (ZSL)", description: "The world's oldest scientific zoo, located in Regent's Park. Home to thousands of animals and dedicated conservation areas.", image: "https://placehold.co/400x200/009688/FFFFFF?text=LONDON+ZOO", times: "10:00 - 17:00 (Varies by season)", travel: "Nearest Underground: Camden Town (Northern line). Bus: Routes 274.", admission: "Approx. £30.00 (Adult), £20.00 (Child) - Booking recommended." },
    { id: 23, name: "Shrek's Adventure! London", description: "A walk-and-ride interactive adventure through the world of Shrek, featuring live actors, special effects, and a 4D ride.", image: "https://placehold.co/400x200/FFC107/000000?text=SHREK+ADVENTURE", times: "10:00 - 16:00 (Booking essential)", travel: "Nearest Underground: Waterloo (Jubilee, Northern, Bakerloo, Waterloo & City lines).", admission: "Starts from approx. £27.00 (Standard Ticket)" },
    { id: 24, name: "Kew Gardens", description: "A world heritage site housing the largest and most diverse botanical collection in the world. Features glasshouses, a treetop walkway, and play areas.", image: "https://placehold.co/400x200/008000/FFFFFF?text=KEW+GARDENS", times: "10:00 - 18:00 (Varies seasonally)", travel: "Nearest Underground: Kew Gardens (District line). Overground: Kew Gardens.", admission: "Approx. £18.00 (Adult, online booking)" },
];

const londonEmergencyContacts = [
    { 
        id: 1, 
        name: "All Emergency Services", 
        number: "999", 
        description: "For immediate, life-threatening emergencies requiring Police, Fire, or Ambulance services.", 
        icon: Siren, 
        color: '#B71C1C' // Deep Red 
    },
    { 
        id: 2, 
        name: "Non-Emergency Police", 
        number: "101", 
        description: "For reporting crimes that are not ongoing, providing information, or non-urgent inquiries.", 
        icon: Search, 
        color: '#1565C0' // Blue 
    },
    { 
        id: 3, 
        name: "NHS Non-Emergency Medical", 
        number: "111", 
        description: "For urgent medical help or advice when it's not a life-threatening situation and you can't wait for a GP.", 
        icon: Info, 
        color: '#004D40' // Dark Green 
    },
    { 
        id: 4, 
        name: "Samaritans (Emotional Support)", 
        number: "116 123", 
        description: "Free, 24-hour confidential listening service for anyone struggling to cope.", 
        icon: Phone, 
        color: '#FF6F00' // Orange 
    },
    { 
        id: 5, 
        name: "London TravelWatch", 
        number: "0343 222 1234", 
        description: "For non-emergency travel information, disruptions, or issues with public transport in London (TfL).", 
        icon: Bus, 
        color: '#8D6E63' // Brown 
    },
];

// --- EMBASSIES DATA (Reverted to placeholder images) ---
const londonEmbassies = [
    {
        id: 1,
        country: "United States",
        address: "33 Nine Elms Lane, Nine Elms, London SW11 7US",
        phone: "+44 20 7499 9000",
        website: "https://uk.usembassy.gov/",
        image: "https://placehold.co/400x200/002868/FFFFFF?text=USA+EMBASSY"
    },
    {
        id: 2,
        country: "France",
        address: "58 Knightsbridge, London SW1X 7JT",
        phone: "+44 20 7073 1000",
        website: "https://uk.ambafrance.org/",
        image: "https://placehold.co/400x200/ED2939/FFFFFF?text=FRANCE+EMBASSY"
    },
    {
        id: 3,
        country: "Germany",
        address: "23 Belgrave Square, London SW1X 8PZ",
        phone: "+44 20 7824 1300",
        website: "https://uk.diplo.de/",
        image: "https://placehold.co/400x200/000000/FFCC00?text=GERMANY+EMBASSY"
    },
    {
        id: 4,
        country: "Canada",
        address: "Canada House, Trafalgar Square, London SW1Y 5BJ",
        phone: "+44 20 7004 6000",
        website: "https://www.canadainternational.gc.ca/united_kingdom-royaume_uni/",
        image: "https://placehold.co/400x200/D8203E/FFFFFF?text=CANADA+EMBASSY"
    },
    {
        id: 5,
        country: "Australia",
        address: "Australia House, Strand, London WC2B 4LA",
        phone: "+44 20 7379 4334",
        website: "https://uk.embassy.gov.au/",
        image: "https://placehold.co/400x200/00008B/FFFFFF?text=AUSTRALIA+EMBASSY"
    },
];

// --- Navigation Item Definitions ---

const coreNavItems = [
    { key: 'explore', label: 'Explore', icon: LayoutGrid, description: "City Projects Dashboard" },
    { key: 'airports', label: 'Airports', icon: Plane, description: "Global Airport Infrastructure" },
    { key: 'events', label: 'Events', icon: CalendarDays, description: "View city planning meetings and community events." },
    { key: 'settings', label: 'Settings', icon: Settings, description: "Application configuration and user info" },
];

// UPDATED POI ITEMS (Renamed Welcome Pack to Welcome Planner)
const poiItems = [
    { key: 'welcome', label: 'Welcome Planner', icon: Flag, description: "A comprehensive introduction and essential tips for visitors and urban planning overview." }, // Renamed label
    { key: 'landmarks', label: 'Landmarks', icon: Landmark, description: "Historical and architectural structures." },
    { key: 'attractions', label: 'Attractions', icon: Star, description: "Popular points of interest and tourist destinations." },
    { key: 'family', label: 'Family Outings', icon: Users, description: "The best family-friendly attractions and educational venues for visitors with children." },
    { key: 'emergency', label: 'Emergency Contacts', icon: AlertTriangle, description: "Immediate and non-urgent contact details for critical services." },
    { key: 'diplomatic', label: 'Diplomatic Services', icon: ShieldCheck, description: "Essential embassy and consulate contact services for foreign nationals." },
    { key: 'museums', label: 'Museums', icon: Palette, description: "Cultural institutions and art galleries." },
    { key: 'parks', label: 'Parks & Gardens', icon: Trees, description: "Green spaces and nature reserves." },
    { key: 'shopping', label: 'Shopping', icon: ShoppingCart, description: "Markets, malls, and local shops." },
];

// UPDATED MOBILE NAVIGATION ITEMS (Kept label short as 'Welcome' for mobile bar constraints)
const mobileNavItems = [
    { key: 'landmarks', label: 'Landmarks', icon: Landmark },
    { key: 'welcome', label: 'Welcome', icon: Flag }, // Points to Welcome Planner
    { key: 'family', label: 'Family', icon: Users },
    { key: 'emergency', label: 'Emergency', icon: AlertTriangle },
    { key: 'diplomatic', label: 'Diplomatic', icon: ShieldCheck }, // Points to Embassies
];

// --- Utility Components ---

const DataCard = ({ title, content, icon: Icon, image, color }) => (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] border border-gray-100">
        <div className="relative h-32">
            <img src={image} alt={title} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/E0E0E0/333333?text=Project+Image"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="p-4 sm:p-6">
            <h3 className={`text-xl font-bold text-gray-900 flex items-center mb-2`} style={{ color: PRIMARY_COLOR }}>
                {Icon && <Icon className="w-5 h-5 mr-2" style={{ color: PRIMARY_COLOR }} />}
                {title}
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
                {Object.entries(content).map(([key, value]) => (
                    <p key={key} className="flex justify-between">
                        <span className="font-medium capitalize text-gray-500">{key}:</span>
                        <span className="font-semibold text-gray-800">{value}</span>
                    </p>
                ))}
            </div>
        </div>
    </div>
);

const LandmarkCard = ({ landmark }) => (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        
        {/* Landmark Image */}
        <div className="relative w-full h-48">
            <img 
                src={landmark.image} 
                alt={landmark.name} 
                className="w-full h-full object-cover" 
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/E0E0E0/333333?text=London+Site"; }} 
            />
        </div>

        <div className="p-4 sm:p-6">
            {/* Landmark Name - now correctly positioned within the content area */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight mb-2" style={{ color: PRIMARY_COLOR }}>
                {landmark.name}
            </h3>
            
            {/* Description is now the first item in the content body */}
            <p className="text-gray-700 mb-4 text-sm">{landmark.description}</p>
            
            <div className="space-y-4 border-t pt-4">
                {/* Opening Times */}
                <div className="flex items-start">
                    <Clock className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: ACCENT_COLOR }} />
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Operating Times</p>
                        <p className="text-sm text-gray-600">{landmark.times}</p>
                    </div>
                </div>

                {/* Travel */}
                <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: ACCENT_COLOR }} />
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Travel & Nearest Station</p>
                        <p className="text-sm text-gray-600">{landmark.travel}</p>
                    </div>
                </div>

                {/* Admission Fee */}
                <div className="flex items-start">
                    {landmark.admission.toLowerCase().includes('free') ? 
                        <Ticket className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: ACCENT_COLOR }} />
                        :
                        <PoundSterling className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: ACCENT_COLOR }} />
                    }
                    
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Admission Fee</p>
                        <p className="text-sm text-gray-600">{landmark.admission}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const LoadingIndicator = () => (
    <div className="flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: PRIMARY_COLOR }}></div>
        <p className="ml-3 text-gray-600">Loading CityWP data...</p>
    </div>
);

const EmergencyCard = ({ contact }) => (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 transform transition duration-300 hover:scale-[1.02]">
        <div className="p-6">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
                <div className="flex items-center">
                    <contact.icon className="w-8 h-8 mr-3" style={{ color: contact.color }} />
                    <h3 className="text-xl font-extrabold text-gray-900" style={{ color: PRIMARY_COLOR }}>
                        {contact.name}
                    </h3>
                </div>
                <a 
                    href={`tel:${contact.number.replace(/\s/g, '')}`} 
                    className="flex items-center text-sm font-bold px-4 py-2 rounded-full text-white shadow-md transition duration-150 hover:opacity-90"
                    style={{ backgroundColor: contact.color }}
                >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="mb-4 sm:mb-0">
                    <p className="text-sm font-semibold text-gray-800">Phone Number</p>
                    <p className="text-4xl font-black mt-1" style={{ color: contact.color }}>{contact.number}</p>
                </div>
                <div className="sm:w-1/2">
                    <p className="text-sm font-semibold text-gray-800 mb-1">When to Call</p>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                </div>
            </div>
        </div>
    </div>
);

// --- NEW WELCOME PAGE COMPONENT (Updated titles and labels) ---
const WelcomePage = () => (
    <div className="p-4 sm:p-8">
        {/* Header Banner */}
        <div 
            className="relative bg-cover bg-center h-64 rounded-2xl shadow-xl overflow-hidden mb-8"
            style={{ 
                backgroundImage: `url('https://placehold.co/1200x400/002366/FFFFFF?text=CITY+WELCOME+PLANNER')`, // Updated text in placeholder
                backgroundSize: 'cover'
            }}
        >
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-6xl font-black text-white mb-2 tracking-tight">
                        City Welcome Planner
                    </h1>
                    <p className="text-xl text-gray-200 font-medium">Your essential guide to London.</p>
                </div>
            </div>
        </div>
        
        {/* Introduction Text */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: PRIMARY_COLOR }}>
                City Welcome Planner (CWP) welcomes you to the city of London.
            </h2>
            <p className="text-gray-700 mb-4">
                London is the **Capital of England** and the **United Kingdom**. The city is filled with historic, beautiful landmarks and attractions. With great public transportation (TfL) making it easy to commute within the city to its landmarks, attractions, museums, shopping, and other points of interests.
            </p>
            <p className="text-gray-700">
                To facilitate your visit, CWP is all you need. We've compiled all key relevant information, from landmarks and transport to emergency and diplomatic contacts, to make your stay safer and more pleasurable.
            </p>
        </div>

        {/* Key Facts Cards */}
        <h2 className="text-2xl font-bold mb-6" style={{ color: PRIMARY_COLOR }}>Key Travel Facts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Currency Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center transition duration-200 hover:shadow-xl">
                <PoundSterling className="w-10 h-10 mb-3" style={{ color: ACCENT_COLOR }} />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Currency</h3>
                <p className="text-sm text-gray-600 font-bold">British Sterling Pound (£)</p>
            </div>

            {/* Country Code Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center transition duration-200 hover:shadow-xl">
                <Phone className="w-10 h-10 mb-3" style={{ color: ACCENT_COLOR }} />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Country Code</h3>
                <p className="text-sm text-gray-600 font-bold">+44 (0)</p>
            </div>

            {/* Plug Type Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center transition duration-200 hover:shadow-xl">
                <Plug className="w-10 h-10 mb-3" style={{ color: ACCENT_COLOR }} />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Plug Type</h3>
                <p className="text-sm text-gray-600 font-bold">3 Pin Plugs (Type G)</p>
            </div>
        </div>
    </div>
);
// --- END WELCOME PAGE COMPONENT ---


// Embassy Card Component (Reverted to use image property from data)
const EmbassyCard = ({ embassy }) => (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-[1.02] border border-gray-100">
        
        {/* Banner with Image Placeholder (Reverted) */}
        <div className="relative h-32">
            <img 
                src={embassy.image} 
                alt={`${embassy.country} Embassy`} 
                className="w-full h-full object-cover" 
                // Fallback to primary color background with country name if image fails
                onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = `https://placehold.co/400x200/${PRIMARY_COLOR.substring(1)}/FFFFFF?text=${embassy.country.toUpperCase()}` 
                }} 
            />
            {/* Dark gradient for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <p className="absolute bottom-3 left-4 text-xl font-bold text-white">{embassy.country}</p>
        </div>

        <div className="p-4 sm:p-6">
            <h3 className={`text-xl font-bold text-gray-900 flex items-center mb-4`} style={{ color: PRIMARY_COLOR }}>
                {embassy.country}
            </h3>
            
            <div className="space-y-3">
                {/* Address */}
                <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 flex-shrink-0 text-gray-500" />
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Address</p>
                        <p className="text-sm text-gray-600">{embassy.address}</p>
                    </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 flex-shrink-0 text-gray-500" />
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Non-Emergency Phone</p>
                        <a href={`tel:${embassy.phone.replace(/\s/g, '')}`} className="text-sm text-blue-600 hover:underline">{embassy.phone}</a>
                    </div>
                </div>

                {/* Website */}
                <div className="flex items-start">
                    <Globe className="w-5 h-5 mr-3 flex-shrink-0 text-gray-500" />
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Website</p>
                        <a href={embassy.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">{embassy.website}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


// --- Diplomatic Services Page ---
const DiplomaticPage = ({ embassies }) => (
    <div className="p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 flex items-center" style={{ color: PRIMARY_COLOR }}>
            <ShieldCheck className="w-8 h-8 mr-3" />
            Diplomatic Services (Embassies & Consulates)
        </h1>
        <p className="text-gray-600 mb-8">Essential contact details and locations for major diplomatic missions in the city of London.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {embassies.map(embassy => (
                <EmbassyCard key={embassy.id} embassy={embassy} />
            ))}
        </div>
    </div>
);
// --- END Diplomatic Services Page ---


const BoardingPassCard = ({ airport }) => {
    const { name, code, city, country, type } = airport;

    return (
        <div className="flex flex-col sm:flex-row w-full bg-white shadow-xl rounded-2xl overflow-hidden transition duration-300 hover:scale-[1.02] border border-gray-200">
            {/* 1. Main Content Section (Left/Top) */}
            <div className="flex-1 p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Aviation Asset</h4>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full text-white shadow-md" style={{ backgroundColor: PRIMARY_COLOR }}>{type}</span>
                </div>

                <div className="flex items-end justify-between border-b border-gray-200 pb-3">
                    <div className="flex flex-col">
                        <p className="text-xs uppercase text-gray-500">City</p>
                        <p className="text-3xl font-extrabold text-gray-900 leading-tight">{city}</p>
                    </div>
                    <div className="flex flex-col text-right">
                        <p className="text-xs uppercase text-gray-500">Country</p>
                        <p className="text-lg font-bold text-gray-800">{country}</p>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs uppercase text-gray-500">Name</p>
                        <p className="text-xl font-bold" style={{ color: PRIMARY_COLOR }}>{name}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase text-gray-500 text-right">IATA Code</p>
                        <p className="text-4xl font-extrabold text-right" style={{ color: PRIMARY_COLOR }}>{code}</p>
                    </div>
                </div>
            </div>

            {/* 2. Tear-off Stub Section (Right/Bottom) - Uses dashed border for perforation effect */}
            <div 
                className="w-full sm:w-40 bg-gray-100 p-6 sm:p-4 flex flex-col items-center justify-center relative 
                         sm:border-l-2 sm:border-dashed sm:border-gray-300 
                         border-t-2 border-dashed border-gray-300"
            >
                <div className="text-center mb-3">
                    <p className="text-xs uppercase text-gray-500">ID</p>
                    <p className="text-2xl font-extrabold text-gray-800">{code}</p>
                </div>
                
                {/* Barcode Mock using simple divs (Rotated 90 degrees on desktop) */}
                <div className="flex h-10 w-24 sm:w-full space-x-0.5 sm:rotate-90">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className={`h-full ${i % 3 === 0 ? 'w-1.5 bg-gray-600' : 'w-1 bg-gray-400'}`}></div>
                    ))}
                </div>
                <p className="text-xs font-mono text-gray-600 mt-4 sm:mt-8">ASSET {airport.id}</p>
            </div>
        </div>
    );
};

// --- Reusable Page Components ---

const PageTemplate = ({ title, description, icon: Icon }) => (
    <div className="p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 flex items-center" style={{ color: PRIMARY_COLOR }}>
            <Icon className="w-8 h-8 mr-3" />
            {title}
        </h1>
        <p className="text-gray-600 mb-8">{description}</p>
        <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-gray-100">
            <p className="text-gray-500">Content area for {title} in London (Data integration pending).</p>
            <p className="mt-2 text-sm text-gray-400">This page will eventually load dynamic data cards related to {title.toLowerCase()}.</p>
        </div>
    </div>
);

const LandmarksPage = ({ landmarks }) => (
    <div className="p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 flex items-center" style={{ color: PRIMARY_COLOR }}>
            <Landmark className="w-8 h-8 mr-3" />
            Top London Landmarks
        </h1>
        <p className="text-gray-600 mb-8">Essential visitor information for the city's most iconic architectural and historical sites.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landmarks.map(landmark => (
                <LandmarkCard key={landmark.id} landmark={landmark} />
            ))}
        </div>
    </div>
);

const AttractionsPage = ({ attractions }) => (
    <div className="p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 flex items-center" style={{ color: PRIMARY_COLOR }}>
            <Star className="w-8 h-8 mr-3" />
            Top London Attractions
        </h1>
        <p className="text-gray-600 mb-8">The must-visit entertainment, culture, and experience venues for tourists and residents.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map(attraction => (
                <LandmarkCard key={attraction.id} landmark={attraction} />
            ))}
        </div>
    </div>
);

const FamilyOutingsPage = ({ outings }) => (
    <div className="p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 flex items-center" style={{ color: PRIMARY_COLOR }}>
            <Users className="w-8 h-8 mr-3" />
            Top London Family Outings
        </h1>
        <p className="text-gray-600 mb-8">The best family-friendly attractions and educational venues for visitors with children.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outings.map(outing => (
                <LandmarkCard key={outing.id} landmark={outing} />
            ))}
        </div>
    </div>
);

const EmergencyPage = ({ contacts }) => (
    <div className="p-4 sm:p-8">
        <div className="bg-red-50 p-4 sm:p-6 rounded-xl shadow-inner mb-8 border border-red-200">
             <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 flex items-center text-red-700">
                <Siren className="w-8 h-8 mr-3" />
                London Emergency Contacts
            </h1>
            <p className="text-red-800 font-medium">
                In a life-threatening emergency, always call 999 first. Use the non-emergency numbers below for less critical situations.
            </p>
        </div>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contacts.map(contact => (
                <EmergencyCard key={contact.id} contact={contact} />
            ))}
        </div>
    </div>
);


const EventsPage = () => <PageTemplate title="London City Events Calendar" description="Upcoming planning meetings, community engagements, and infrastructure project deadlines in London." icon={CalendarDays} />;
const SearchPage = () => <PageTemplate title="Global Data Search" description="Search across all London city projects, airports, and city guide databases." icon={Search} />;

const ExplorePage = ({ projects }) => (
    <div className="p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: PRIMARY_COLOR }}>London City Projects Dashboard</h1>
        <p className="text-gray-600 mb-8">Browse key urban development initiatives and planning efforts across **Greater London**.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
                <DataCard
                    key={project.id}
                    title={project.name}
                    icon={LayoutGrid}
                    image={project.image}
                    color={PRIMARY_COLOR}
                    content={{
                        location: project.location,
                        status: project.status,
                        type: project.type,
                    }}
                />
            ))}
        </div>

        {projects.length === 0 && (
            <div className="text-center p-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No urban projects currently listed.</p>
            </div>
        )}
    </div>
);

const AirportsPage = ({ airports }) => (
    <div className="p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: PRIMARY_COLOR }}>London Airport Network Overview</h1>
        <p className="text-gray-600 mb-8">Detailed view of current airport projects and major aviation hubs serving the London area. (Displayed as Boarding Passes)</p>
        
        {/* Changed grid to single column for the ticket style */}
        <div className="grid grid-cols-1 gap-6"> 
            {airports.map(airport => (
                <BoardingPassCard
                    key={airport.id}
                    airport={airport}
                />
            ))}
        </div>

        {airports.length === 0 && (
            <div className="text-center p-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No airport data currently available.</p>
            </div>
        )}
    </div>
);

const SettingsPage = ({ userId }) => (
    <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6" style={{ color: PRIMARY_COLOR }}>Application Settings</h1>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <User className="w-5 h-5 mr-2" style={{ color: ACCENT_COLOR }} />
                User Information
            </h2>
            <div className="space-y-3">
                <p className="text-sm">
                    <span className="font-medium text-gray-500">User ID:</span> 
                    <span className="break-all ml-2 p-1 bg-gray-100 rounded text-gray-800 font-mono text-xs">{userId || 'Not authenticated'}</span>
                </p>
                <p className="text-sm text-gray-600">
                    This ID is used to identify your private data storage within the app.
                </p>
            </div>
            
            <hr className="my-6 border-gray-200" />
            
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Database className="w-5 h-5 mr-2" style={{ color: ACCENT_COLOR }} />
                Data Storage
            </h2>
            <p className="text-sm text-gray-600">
                Data is stored in a secure Firestore database linked to App ID: 
                <span className="font-mono text-xs ml-1 p-1 bg-gray-100 rounded text-gray-800">{appId}</span>.
            </p>
        </div>
    </div>
);

const GuidePage = ({ setCurrentPage }) => (
    <div className="p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 flex items-center" style={{ color: PRIMARY_COLOR }}>
            <Map className="w-8 h-8 mr-3" />
            London City Guide Index
        </h1>
        <p className="text-gray-600 mb-8">Navigate through London's various points of interest and visitor resources.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {poiItems.map(item => (
                <div 
                    key={item.key}
                    onClick={() => setCurrentPage(item.key)}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 cursor-pointer transform transition duration-200 hover:shadow-xl hover:-translate-y-1"
                >
                    <item.icon className="w-8 h-8 mb-3" style={{ color: PRIMARY_COLOR }} />
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{item.label}</h2>
                    <p className="text-sm text-gray-500">{item.description}</p>
                </div>
            ))}
        </div>
    </div>
);


// --- Top Header Component ---
const TopHeader = ({ setCurrentPage, currentPage }) => (
    <header className="sticky top-0 z-20 bg-white shadow-lg border-b border-gray-100 px-4 py-3">
        <div className="max-w-full mx-auto flex items-center justify-between">
            {/* Logo/Brand (Always links to Explore) */}
            <button 
                onClick={() => setCurrentPage('explore')}
                className="text-xl font-black transition duration-150 flex items-center" 
                style={{ color: PRIMARY_COLOR }}
            >
                <Plane className="w-5 h-5 mr-2 text-gray-400 hidden lg:block" />
                CityWP
            </button>

            {/* Central Navigation/Search */}
            <div className="flex items-center space-x-3 sm:space-x-4">
                {/* 1. Explore Button (Desktop Quick Link) */}
                <button
                    onClick={() => setCurrentPage('explore')}
                    className={`hidden sm:flex items-center text-sm font-medium p-2 rounded-lg transition duration-150 ${
                        currentPage === 'explore' ? 'text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    style={currentPage === 'explore' ? { backgroundColor: PRIMARY_COLOR } : {}}
                >
                    <LayoutGrid className="w-5 h-5 mr-1" />
                    Explore
                </button>
                
                {/* 2. Events Button (Desktop Quick Link - Mobile uses bottom bar for primary access) */}
                <button
                    onClick={() => setCurrentPage('events')}
                    className={`hidden sm:flex items-center text-sm font-medium p-2 rounded-lg transition duration-150 ${
                        currentPage === 'events' ? 'text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    style={currentPage === 'events' ? { backgroundColor: PRIMARY_COLOR } : {}}
                >
                    <CalendarDays className="w-5 h-5 mr-1" />
                    Events
                </button>
                
                {/* 3. Search Bar (Universal Access) */}
                <div className="relative w-40 sm:w-64">
                    <input
                        type="text"
                        placeholder="Search data..."
                        className="w-full p-2 pl-9 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-opacity-50"
                        style={{ 
                            borderColor: PRIMARY_COLOR, 
                            outlineColor: PRIMARY_COLOR, 
                            backgroundColor: 'white' 
                        }}
                        onFocus={() => setCurrentPage('search')}
                    />
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>
        </div>
    </header>
);


// --- Page Router Mapping ---

const pagesWithCustomComponents = ['landmarks', 'attractions', 'family', 'emergency', 'welcome', 'diplomatic'];

const poiPageMap = poiItems.reduce((acc, item) => {
    if (!pagesWithCustomComponents.includes(item.key)) {
        acc[item.key] = () => <PageTemplate title={item.label} description={item.description} icon={item.icon} />;
    }
    return acc;
}, {});

// --- Main Application Component ---

const App = () => {
    const [currentPage, setCurrentPage] = useState('welcome'); // Default to Welcome Page
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [db, setDb] = useState(null); 
    const [auth, setAuth] = useState(null);

    // 1. Firebase Initialization and Authentication
    useEffect(() => {
        try {
            if (Object.keys(firebaseConfig).length === 0) {
                console.error("Firebase config is missing or invalid. Running in mock mode.");
                setIsAuthReady(true);
                return;
            }
            const app = initializeApp(firebaseConfig);
            const firestore = getFirestore(app);
            const authentication = getAuth(app);
            
            setDb(firestore);
            setAuth(authentication);
            
            // Log in using the custom token provided by the environment
            const signIn = async () => {
                if (initialAuthToken) {
                    await signInWithCustomToken(authentication, initialAuthToken);
                } else {
                    await signInAnonymously(authentication);
                }
            };
            
            onAuthStateChanged(authentication, (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    // Using randomUUID for unauthenticated users for private/shared storage logic
                    setUserId(crypto.randomUUID()); 
                }
                setIsAuthReady(true);
            });

            signIn().catch(e => {
                console.error("Firebase sign-in failed:", e);
                setIsAuthReady(true);
            });

        } catch (error) {
            console.error("Failed to initialize Firebase:", error);
            setIsAuthReady(true);
        }
    }, []);

    // 2. Data Synchronization (using local mock data)
    const cityProjects = initialCityProjects;
    const airports = initialAirports;
    const landmarks = londonLandmarks;
    const attractions = londonAttractions; 
    const familyOutings = londonFamilyOutings;
    const emergencyContacts = londonEmergencyContacts;
    const embassies = londonEmbassies; // Reverted embassy data

    // Combined navigation items for desktop sidebar 
    const allNavItems = [
        ...coreNavItems,
        { key: '---guide-header---', label: 'City Guide', icon: null, isHeader: true },
        ...poiItems
    ];

    const renderPage = () => {
        if (!isAuthReady) {
            return <LoadingIndicator />;
        }
        
        // Handle core, utility, and POI pages
        switch (currentPage) {
            case 'explore':
                return <ExplorePage projects={cityProjects} />;
            case 'airports':
                return <AirportsPage airports={airports} />;
            case 'events':
                return <EventsPage />;
            case 'search':
                return <SearchPage />;
            case 'settings':
                return <SettingsPage userId={userId} />;
            case 'welcome': // Welcome Planner Page
                return <WelcomePage />;
            case 'diplomatic': // Diplomatic Services Page
                return <DiplomaticPage embassies={embassies} />;
            case 'landmarks': 
                return <LandmarksPage landmarks={landmarks} />;
            case 'attractions': 
                return <AttractionsPage attractions={attractions} />;
            case 'family':
                return <FamilyOutingsPage outings={familyOutings} />;
            case 'emergency': 
                return <EmergencyPage contacts={emergencyContacts} />;
            case 'guide':
                return <GuidePage setCurrentPage={setCurrentPage} />;
            default:
                // Check if it's one of the other POI pages
                if (poiPageMap[currentPage]) {
                    const PoiComponent = poiPageMap[currentPage];
                    return <PoiComponent />;
                }
                // Fallback to the Welcome page as the primary entry point
                return <WelcomePage />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col lg:flex-row">
            {/* Desktop Sidebar Navigation (Hidden on small screens) */}
            <nav className="hidden lg:flex bg-white shadow-xl lg:w-64 lg:flex-col lg:h-screen p-4 lg:p-0 border-r border-gray-100">
                <div className="flex-shrink-0 p-4">
                    <div className="text-2xl font-black" style={{ color: PRIMARY_COLOR }}>CityWP</div>
                    <p className="text-xs text-gray-500">London Urban Planning App</p>
                    <h3 className="text-xs font-semibold uppercase text-gray-400 mt-4">Core Planning</h3>
                </div>
                
                <div className="flex flex-1 lg:flex-col lg:mt-0 lg:space-y-1 pb-2 px-4">
                    {allNavItems.map(item => {
                        if (item.isHeader) {
                            return <h3 key={item.key} className="text-xs font-semibold uppercase text-gray-400 pt-4 pb-1 mt-2">{item.label}</h3>;
                        }
                        return (
                            <button
                                key={item.key}
                                onClick={() => setCurrentPage(item.key)}
                                className={`flex items-center p-3 text-sm font-medium rounded-lg transition duration-150 whitespace-nowrap w-full
                                    ${currentPage === item.key 
                                        ? 'text-white shadow-md' 
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
                                }
                                style={currentPage === item.key ? { backgroundColor: PRIMARY_COLOR } : {}}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Main Content Area Wrapper (Includes the sticky header) */}
            <div className="flex-1 flex flex-col">
                <TopHeader setCurrentPage={setCurrentPage} currentPage={currentPage} />

                <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
                    {renderPage()}
                </main>
            </div>
            
            {/* Mobile Bottom Tab Bar (Hidden on large screens) */}
            <nav className="fixed bottom-0 inset-x-0 bg-white shadow-2xl z-10 lg:hidden border-t border-gray-200 h-16 flex justify-around items-center">
                {mobileNavItems.map(item => (
                    <button
                        key={item.key}
                        onClick={() => setCurrentPage(item.key)}
                        className={`flex flex-col items-center justify-center flex-1 p-1 transition duration-150
                            ${currentPage === item.key 
                                ? 'text-white font-semibold' 
                                : 'text-gray-500 hover:text-gray-900'}`
                        }
                        style={currentPage === item.key ? { color: PRIMARY_COLOR } : {}}
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-xs mt-0.5">{item.label}</span>
                    </button>
                ))}
            </nav>

        </div>
    );
};

export default App;
