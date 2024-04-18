const express = require('express');

const { ServerConfig } = require('./config');
const rateLimit=require('express-rate-limit');
const  {createProxyMiddleware} = require('http-proxy-middleware');
const apiRoutes = require('./routes');

const app = express();
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	max: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	
})
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  '/flightsService',
  createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
  }),
);
app.use(
  '/bookingService',
  createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
  }),
);
app.use(limiter);
app.use('/api', apiRoutes);

// app.use('/flightsService/api', apiRoutes);



app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
