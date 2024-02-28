import * as request from '../request';
import { fetchBuildingDetailUrl } from '../../constants/url-generator';

export default buildingId => {
	debugger;
	return request.post(fetchBuildingDetailUrl(),
			{
				buildingId
			}
	).then(request.jsonResponse);
};
