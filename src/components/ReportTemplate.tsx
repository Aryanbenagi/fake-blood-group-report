import React from 'react';
import { Activity, Calendar, User, Stethoscope, Phone, MapPin, Mail } from 'lucide-react';
import { ReportData } from '../types/ReportData';

interface ReportTemplateProps {
  data: ReportData;
}

const ReportTemplate: React.FC<ReportTemplateProps> = ({ data }) => {
  return (
    <div id="report-template" className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="border-2 border-gray-800">
        {/* Top Header with Contact Info */}
        <div className="bg-white p-4 border-b border-gray-300">
          <div className="flex justify-between items-start text-xs">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="text-gray-800">
                <div className="font-bold">Near Aasra Bridge, Shop No 3,</div>
                <div>Ashok Nagar, Vijapur Road Near</div>
                <div>Sushil Kumar Shinde Building, Solapur-413004</div>
              </div>
            </div>
            <div className="text-right text-gray-800">
              <div className="font-bold">E-mail : contact@vaishnavipathology.com</div>
              <div>info@vaishnavipathology.com</div>
              <div>www.vaishnavipathology.com</div>
            </div>
            <div className="w-16 h-16 bg-red-600 flex items-center justify-center text-white text-xs font-bold">
              NABL<br/>VERIFIED
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Vaishnavi Pathology Laboratory</h1>
              <p className="text-sm">CONSULTING, DEVELOPMENT, SUPPORT</p>
            </div>
            <div className="text-right text-sm">
              <div className="bg-red-800 px-3 py-1 rounded">NSIC-CRISIL: SE3C</div>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="bg-red-700 text-white px-4 py-2 text-right text-sm">
          <div>Phone : 022-21022438 / 21021849 / 65883968</div>
          <div>Mobile : 9820373936/ 9920548030</div>
        </div>
      </div>

      <div className="p-8">
        {/* Report Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">
            PATHOLOGY REPORT
          </h2>
          <p className="text-lg text-gray-600 mb-3">Complete Blood Count (CBC) Analysis</p>
          <div className="w-32 h-1 bg-teal-600 mx-auto rounded"></div>
        </div>

        {/* Patient Information */}
        {/* Patient Information Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-sm border border-gray-400">
          <div className="border-r border-gray-400 p-2">
            <div className="flex">
              <span className="font-bold border border-gray-400 px-2 py-1 bg-gray-100 min-w-[100px]">LAB NO.</span>
              <span className="border border-gray-400 px-2 py-1 flex-1">5</span>
            </div>
          </div>
          <div className="border-r border-gray-400 p-2">
            <div className="flex">
              <span className="font-bold border border-gray-400 px-2 py-1 bg-gray-100 min-w-[60px]">DATE</span>
              <span className="border border-gray-400 px-2 py-1 flex-1">{new Date(data.testDate).toLocaleDateString('en-GB')}</span>
            </div>
          </div>
          <div className="p-2">
            <div className="text-right">
              <span className="font-bold">Report ID: {data.reportId}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="space-y-2">
            <div className="flex">
              <span className="font-bold border border-gray-400 px-2 py-1 bg-gray-100 min-w-[120px]">PATIENT NAME</span>
              <span className="border border-gray-400 px-2 py-1 flex-1">{data.patientName}</span>
            </div>
            <div className="flex">
              <span className="font-bold border border-gray-400 px-2 py-1 bg-gray-100 min-w-[120px]">REF. BY DR.</span>
              <span className="border border-gray-400 px-2 py-1 flex-1">{data.doctorName}</span>
            </div>
            <div className="flex">
              <span className="font-bold border border-gray-400 px-2 py-1 bg-gray-100 min-w-[120px]">SAMPLE COLL. AT</span>
              <span className="border border-gray-400 px-2 py-1 flex-1">VAISHNAVI LAB</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex">
              <span className="font-bold border border-gray-400 px-2 py-1 bg-gray-100 min-w-[60px]">SEX</span>
              <span className="border border-gray-400 px-2 py-1 flex-1">{data.sex}</span>
            </div>
            <div className="flex">
              <span className="font-bold border border-gray-400 px-2 py-1 bg-gray-100 min-w-[60px]">AGE</span>
              <span className="border border-gray-400 px-2 py-1 flex-1">{data.age} Years</span>
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Laboratory Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-teal-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Parameter</th>
                  <th className="px-6 py-4 text-center font-semibold">Result</th>
                  <th className="px-6 py-4 text-center font-semibold">Units</th>
                  <th className="px-6 py-4 text-center font-semibold">Reference Range</th>
                  <th className="px-6 py-4 text-center font-semibold">Flag</th>
                </tr>
              </thead>
              <tbody>
                {data.testResults.map((test, index) => {
                  const isEven = index % 2 === 0;
                  const resultValue = parseFloat(test.result);
                  const rangeMatch = test.referenceRange.match(/(\d+\.?\d*)-(\d+\.?\d*)/);
                  let status = 'Normal';
                  let statusColor = 'text-green-700 bg-green-100 border-green-200';

                  if (rangeMatch && !isNaN(resultValue)) {
                    const [, minStr, maxStr] = rangeMatch;
                    const min = parseFloat(minStr);
                    const max = parseFloat(maxStr);
                    
                    if (resultValue < min) {
                      status = 'Low';
                      statusColor = 'text-blue-700 bg-blue-100 border-blue-200';
                    } else if (resultValue > max) {
                      status = 'High';
                      statusColor = 'text-red-700 bg-red-100 border-red-200';
                    }
                  }

                  return (
                    <tr key={test.id} className={isEven ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{test.testName}</td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-900">{test.result}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{test.unit}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{test.referenceRange}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-md text-xs font-bold border ${statusColor}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes */}
        {data.notes && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Clinical Notes</h3>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <p className="text-gray-800 leading-relaxed">{data.notes}</p>
            </div>
          </div>
        )}

        {/* Doctor Information & Signature */}
        <div className="border-t border-gray-200 pt-8">
          {/* Quality Assurance */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Tested By:</p>
                <p className="text-gray-600">Lab Technician</p>
                <p className="text-gray-600">Reg. No: LT-2024-001</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Verified By:</p>
                <p className="text-gray-600">Senior Technologist</p>
                <p className="text-gray-600">Reg. No: ST-2024-005</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Method:</p>
                <p className="text-gray-600">Automated Analyzer</p>
                <p className="text-gray-600">Sysmex XN-1000</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end">
            <div className="mb-6 lg:mb-0">
              <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-teal-600" />
                Consultant Pathologist
              </h4>
              <p className="text-lg font-semibold text-gray-900">{data.doctorName}</p>
              <p className="text-gray-600">MD (Pathology)</p>
              <p className="text-gray-600">Reg. No: MCI-12345</p>
            </div>

            {data.signature && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Digital Signature</p>
                <div className="border border-gray-300 rounded p-2 bg-white">
                  <img 
                    src={data.signature} 
                    alt="Pathologist Signature" 
                    className="h-16 max-w-48 object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Digitally Signed</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="text-left">
              <p className="font-semibold text-gray-700">Important Notes:</p>
              <ul className="text-xs text-gray-600 mt-1 space-y-1">
                <li>• This report is valid only with authorized signature</li>
                <li>• Results are based on sample provided</li>
                <li>• Please correlate with clinical findings</li>
              </ul>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-700">Contact Information:</p>
              <p className="text-xs text-gray-600 mt-1">24/7 Helpline: +91-9876543210</p>
              <p className="text-xs text-gray-600">Email: reports@vaishnavipathology.com</p>
              <p className="text-xs text-gray-600">Website: www.vaishnavipathology.com</p>
            </div>
          </div>
          <p className="text-xs border-t pt-2">This is a computer generated report and does not require physical signature. Report generated on {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportTemplate;