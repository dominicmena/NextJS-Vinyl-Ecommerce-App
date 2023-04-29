import { useRouter } from "next/router"


const PAGE_SIZE = 2

const prices = [
    {
        name: '$1 to $50',
        value: '1-50',
    },
    {
        name: '$51 to $200',
        value: '51-200',
    },
    {
        name: '$201 to $1000',
        value: '201-1000',
    },
]

const ratings = [1, 2, 3, 4, 5]

export default function Search(props) {
    const router = useRouter()
    const {
        query= 'all',
        category = 'all',
        brand = 'all',
        price = 'all',
        rating = 'all',
        sort = 'all',
        page = 1,
    } = router.query

    const { products, countProducts, categories, brands, pages } = props

    const filterSearch = ({
        page,
        category, 
        brand,
        sort,
        min,
        max,
        searchQuery,
        price,
        rating,
    }) => {
        const {query} = router
        if (page) query.page = page
        if (searchQuery) query.searchQuery = searchQuery
        if (sort) query.sort = sort
        if (category) query.category = category
        if (brand) query.brand = brand
        if (price) query.price = price
        if (rating) query.rating = rating
    }
}