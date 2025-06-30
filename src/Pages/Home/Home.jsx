import React from 'react';
import Banner from './Banner';
import PopularBooks from './PopularBooks';
import FeaturedCategories from './FeaturedCategories';


import FAQSection from './FAQSection';
import Tips from './Tips';


const Home = () => {
    return (
        <div>
            <Banner ></Banner>
            <PopularBooks></PopularBooks>
            
            <div className='bg-gray-100'>
                <FeaturedCategories></FeaturedCategories>
                    <FAQSection></FAQSection>
                    <Tips></Tips>
            </div>

        </div>
    );
};

export default Home;