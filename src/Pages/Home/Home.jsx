import React from 'react';
import Banner from './Banner';
import PopularBooks from './PopularBooks';
import FeaturedCategories from './FeaturedCategories';


import FAQSection from './FAQSection';
import Tips from './Tips';
import Footer from './Footer';

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
            <Footer></Footer>
        </div>
    );
};

export default Home;