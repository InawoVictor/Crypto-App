import {useState, useEffect} from "react"
import Image from 'next/image'
import Link from 'next/link'
import styles from "../styles/CryptoList.module.scss"
import Search from './Search';
import ReactPaginate from 'react-paginate';

export const formatNumbers = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const checkPrice = (p)=> {
    const priceChange = Math.sign(p)
    if(priceChange === -1) {
        return "red"
    }
    return "green"
}

const CryptoList = ({coins}) => {   
    const [search, setSearch] = useState("")
    const [filteredCoin, setFilteredCoin] = useState([])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    // Filter Coin
    useEffect(() => {
        setFilteredCoin(
            coins.filter((coin) => {
                return coin.name.toLowerCase().includes(search.toLocaleLowerCase());
            })
        )
    }, [search, coins])

    // ***Pagination Begin

    const itemsPerPage = 10;

    const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage
  const currentItems = filteredCoin.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredCoin.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredCoin.length;
    setItemOffset(newOffset);
  };


    // ***Pagination End

  return (
    <section className='coin-list'>
        <div className="container">            
            <div className={styles.table}>
                <Search value={search} onChange={handleSearch}/>
                <table>
                    <thead>
                        <tr>
                            <th>s/n</th>
                            <th>Coin</th>
                            <th>Price</th>
                            <th>Change in 24H</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((coin, index) => {
                                const {
                                    id,name,symbol,price,icon,
                                    marketCap,priceChange1d
                                } = coin
                                return(                                    
                                    <tr key={id}>                                        
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link href={`/${id}`}>
                                            <Image 
                                                src={icon}
                                                alt={name}
                                                width="20"
                                                height={20}
                                            />
                                                &nbsp;
                                                {symbol}                                            
                                            </Link>
                                        </td>
                                        <td>
                                           ${formatNumbers(price.toFixed(2))}
                                        </td>
                                        <td className={checkPrice(priceChange1d)}>
                                            {priceChange1d}
                                        </td>
                                        <td>
                                        ${formatNumbers(marketCap.toFixed(2))}
                                        </td>
                                        
                                    </tr>
                                    
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {/* Paginate */}
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Prev"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='active'
            />
        </div>
    </section>
  )
}

export default CryptoList
