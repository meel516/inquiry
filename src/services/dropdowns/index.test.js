import * as service from './index'
import * as request from '../request'
import { createDropDownUrl, createLeadSourceDropDownUrl } from '../../constants/url-generator'
import dropdownTypes from '../../constants/dropdown-types'
import { keys } from 'lodash'

jest.mock('../../constants/url-generator', () => ({
    createDropDownUrl: jest.fn(),
    createLeadSourceDropDownUrl: jest.fn()
}))
jest.mock('../request', () => ({
    get: jest.fn()
}))

describe('dropdowns service', () => {
    beforeEach(() => {
        createDropDownUrl.mockClear()
        createLeadSourceDropDownUrl.mockClear()
        request.get.mockClear()
        request.get.mockResolvedValue({ json: () => 'bar' })
    })
    test('should contain proper number of methods', () => {
        expect(keys(service).length).toEqual(11)
    })
    describe('getDropdowns', () => {
        test('should call request.get properly', () => {
            service.getDropdowns('foo').then(response => {
                expect(request.get).toHaveBeenCalledWith('foo')
            })
        })
        test('should return json', () => {
            service.getDropdowns('foo').then(response => {
                expect(response).toEqual('bar')
            })
        })
    })

    describe('getAddressStates', () => {
        test('should properly call getDropdowns', () => {
            service.getAddressStates().then(res => expect(res).toEqual('bar'))
        })
    })

    describe('getLeadSources', () => {
        test('should properly call getDropdowns', () => {
            service.getLeadSources().then(res => expect(res).toEqual('bar'))
        })
    })

    describe('getPhoneTypes', () => {
        test('should properly call getDropdowns', () => {
            service.getPhoneTypes().then(res => expect(res).toEqual('bar'))
        })
    })

    describe('getInquiryTypes', () => {
        test('should properly call getDropdowns', () => {
            service.getInquiryTypes().then(res => expect(res).toEqual('bar'))
        })
    })

    describe('getVeteranStatus', () => {
        test('should properly call getDropdowns', () => {
            service.getVeteranStatus().then(res => expect(res).toEqual('bar'))
        })
    })

    describe('getDecisionTimeframe', () => {
        test('should properly call getDropdowns', () => {
            service.getDecisionTimeframe().then(res => expect(res).toEqual('bar'))
        })
    })

    describe('getReasonForInterest', () => {
        test('should properly call getDropdowns', () => {
            service.getReasonForInterest().then(res => expect(res).toEqual('bar'))
        })
    })

    describe('getCurrentSituation', () => {
        test('should properly call getDropdowns', () => {
            service.getCurrentSituation().then(res => expect(res).toEqual('bar'))
        })
    })

    describe('getCareTypes', () => {
        test('should properly call getDropdowns', () => {
            service.getCareTypes().then(res => expect(res).toEqual('bar'))
        })
    })

    describe('getFollowupActions', () => {
        test('should properly call getDropdowns', () => {
            service.getFollowupActions().then(res => expect(res).toEqual('bar'))
        })
    })

    describe('getLeadSourceDetails', () => {
        test('should properly call getDropdowns', () => {
            service.getLeadSourceDetails('foo').then(res => {
                expect(res).toEqual('bar')
                expect(createLeadSourceDropDownUrl).toHaveBeenCalledWith(expect.anything(), 'foo')
            })
        })
    })
})