'use strict';
import logger from '../utils/logger.js';
const about = {
  createView(req, res) {
    logger.info('About page loading');
    res.send('About the Playlist app');
  }
};
export default about;