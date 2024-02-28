import * as request from '../request';
import { fetchBuildingDetailUrl } from '../../constants/url-generator';

export default (buildingId) =>
		request.post(fetchBuildingDetailUrl(buildingId))
		.then(request.jsonResponse);
