import React from 'react';
import "./MenuPage.scss";

//TODOS: Coffee, Drink, Food, Special

const MenuPage = () => {
    return(
        <div className="Menu">
            <h1>Menu</h1>
            <div className="menu_coffee">
                <div className="parallex" id="coffee">Coffee</div>
                <div className="items">
                    <div>Café Latte <div className="dotLine"/> $3.1 </div>
                    <div>Cappuccino <div className="dotLine"/> $3.1 </div>
                    <div>Espresso <div className="dotLine"/> $3.1 </div>
                    <div>Flat White <div className="dotLine"/> $3.1 </div>
                    <div>Long Black <div className="dotLine"/> $3.1 </div>
                    <div>Macchiato <div className="dotLine"/> $3.1 </div>
                    <div>*** plant-based milk option avaliable ***</div>
                </div >
            </div>
            <div className="menu_cakeNbread">
                <div className="parallex" id="cakeNbread">Cake & Bread</div>
                <div className="items">
                    <div>Cheesecake <div className="dotLine"/> $3.1 </div>
                    <div>Chocolate Cake <div className="dotLine"/> $3.1 </div>
                    <div>Brownie <div className="dotLine"/> $3.1 </div>
                    <div>Apple pie <div className="dotLine"/> $3.1 </div>
                    <div>Banana Bread <div className="dotLine"/> $3.1 </div>
                    <div>Bread with 10 grains <div className="dotLine"/> $3.1 </div>
                </div >
            </div>
            <div className="menu_othersDrink">
                <div className="parallex" id="othersDrink" >Other Drinks</div>
                <div className="items">
                    <div>Juice <div className="dotLine"/> $3.1 </div>
                    <div>Mocha <div className="dotLine"/> $3.1 </div>
                    <div>Babyccino <div className="dotLine"/> $3.1 </div>
                    <div>Smoothie <div className="dotLine"/> $3.1 </div>
                    <div>Chocolate <div className="dotLine"/> $3.1 </div>
                    <div>Beer <div className="dotLine"/> $3.1 </div>
                </div >
            </div>
            <div className="menu_dailySpecial">
                <div id="message">
                    Every day, we also offer different pasta and breakfast. <br/>
                    Also vegan options are avaliable, as always!
                </div>
            </div>
        </div>
    )
}

export default MenuPage