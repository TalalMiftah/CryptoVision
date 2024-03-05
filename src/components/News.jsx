import  {React,useState} from 'react'
import { Typography, Row, Col, Card, Avatar, Input, Select } from 'antd'
import { useEffect } from 'react'

const News = ({ simplified }) => {
  const { Option } = Select;
  const  [cryptoNews,setcryptoNews] = useState();
  const [cryptoN, setcryptoN] = useState(cryptoNews?.Data)
  const [searchTerm, setSearchTerm] = useState('')
  const [lang, setlang] = useState('EN')
  const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
  const url = `https://min-api.cryptocompare.com/data/v2/news/?lang=${lang}&api_key={4b73109b800662283c6a16d23d897c1520f7f6a91ccb60a65f8136790f34f946}`
  useEffect(()=>{
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setcryptoNews(json);
        }
        catch (error)
        {
          console.error('Error fetching data:', error);
        }
      };
    fetchData();
  }, [url]);
  useEffect(()=> {
    const filteredData = cryptoNews?.Data?.filter((coin)=>coin.title?.toLowerCase().includes(searchTerm.toLowerCase()));
        setcryptoN(filteredData); 
      }, [cryptoNews, searchTerm]);
  if (!cryptoNews?.Data) return 'Loading...';
  return (
    <>
    {!simplified &&(
      <div className='search-crypto'>
      <Input placeholder='Search Coin News' style={{ width: 300, marginRight:'10px' }} onChange={(e) => setSearchTerm(e.target.value)} />
      <Select onChange={(value) => setlang(value)} style={{ width: 180 }} defaultValue="English">
        <Option value="EN">English</Option>
        <Option value="PT">Portuguese</Option>
      </Select>
    </div>
  )}
    <Row gutter={[32, 32]}>
      {cryptoN?.map((news, i) =>
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card' style={{borderRadius: "20px"}}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className='news-image-container'>
                <Typography.Title className='news-title' level={3}>{news.title.slice(0,71)}...</Typography.Title>
                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.imageurl || demoImage } alt="news" />
              </div>
              <p >
                {news.body}
              </p>
              
              <div className='provider-container'>
                <Avatar src={news?.source_info?.img} alt="" />
              </div>
            </a>
          </Card>
          <br/>
        </Col>
      )}
    </Row>
    </>
  )
}

export default News
