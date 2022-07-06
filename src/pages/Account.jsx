import React from 'react';
import SavedShows from '../components/SavedShows';

const Account = () => {
    return (
        <>
            <div className="w-full text-white">
                <img className="w-full h-[400px] object-cover"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/271ac55e-7228-438e-824e-92db37981e59/31970505-d557-4c83-982b-57b4a27007a7/MX-es-20220627-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt="/"
                />
                <div className="bg-black/60 fixed top-0 left-0 w-full h-[550px]"></div>
                <div className="absolute top-[20%] p-4 md:p-8">
                    <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
                </div>
            </div>
            <SavedShows />
        </>
    );
}

export default Account;
