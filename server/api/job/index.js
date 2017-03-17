'use strict';

import {Router} from 'express';
import * as controller from './job.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('user'), controller.create);
router.put('/:id', auth.hasRole('user'), controller.upsert);
router.patch('/:id', auth.hasRole('user'), controller.patch);
router.delete('/:id', auth.hasRole('user'), controller.destroy);

module.exports = router;
