import * as urlGenerator from './index'
import reactAppSalesServicesUrl from './react-app-sales-services-url'
import { keys } from 'lodash'

jest.mock('./react-app-sales-services-url')

describe('constants.urlGenerator', () => {
    beforeEach(() => {
        reactAppSalesServicesUrl.mockClear()
        reactAppSalesServicesUrl.mockReturnValue('REACT_APP_SALES_SERVICES_URL')
    })
    test('should contain proper members', () => {
        expect(typeof urlGenerator.createDropDownUrl).toEqual('function')
        expect(typeof urlGenerator.createLeadSourceDropDownUrl).toEqual('function')
        expect(typeof urlGenerator.createCommunitiesFetchUrl).toEqual('function')
        expect(keys(urlGenerator).length).toEqual(4)
    })
    describe('createDropDownUrl', () => {
        test('should construct properly', () => {
            expect(urlGenerator.createDropDownUrl('foo')).toEqual(`REACT_APP_SALES_SERVICES_URL/Sims/api/dropdowns/foo`)
        })
    })
    describe('createLeadSourceDropDownUrl', () => {
        test('should construct properly', () => {
            expect(urlGenerator.createLeadSourceDropDownUrl('foo', 'bar')).toEqual(`REACT_APP_SALES_SERVICES_URL/Sims/api/dropdowns/foo/bar/inquiryLeadSourceDetails`)
        })
    })
    describe('createCommunitiesFetchUrl', () => {
        test('should construct properly', () => {
            expect(urlGenerator.createCommunitiesFetchUrl()).toEqual(`REACT_APP_SALES_SERVICES_URL/CommunitySearch/service/searchByAppAndUser`)
        })
    })
    describe('createDuplicateSearchUrl', () => {
        test('should construct properly', () => {
            expect(urlGenerator.createDuplicateSearchUrl()).toEqual(`REACT_APP_SALES_SERVICES_URL/Sims/api/contact/duplication`)
        })
    })
})