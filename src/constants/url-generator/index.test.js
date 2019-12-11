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
        expect(typeof urlGenerator.createLeadSourceSubDetailDropDownUrl).toEqual('function')
        expect(typeof urlGenerator.createCommunitiesFetchUrl).toEqual('function')
        expect(typeof urlGenerator.createDuplicateSearchUrl).toEqual('function')
        expect(typeof urlGenerator.createEloquaCdoUrl).toEqual('function')
        expect(keys(urlGenerator).length).toEqual(6)
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
    describe('createLeadSourceSubDetailDropDownUrl', () => {
        test('should construct properly', () => {
            expect(urlGenerator.createLeadSourceSubDetailDropDownUrl('foo', 'bar')).toEqual(`REACT_APP_SALES_SERVICES_URL/Sims/api/dropdowns/foo/bar/inquiryLeadSourceSubDetails`)
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
    describe('createEloquaCdoUrl', () => {
        test('should construct properly', () => {
            expect(urlGenerator.createEloquaCdoUrl()).toEqual(`REACT_APP_SALES_SERVICES_URL/Sims/api/inquiryForm/eloqua`)
        })
    })
})