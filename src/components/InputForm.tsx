import React, { useState, useRef } from 'react';
import { Plus, Trash2, Upload, CreditCard as Edit3, Save, X } from 'lucide-react';
import SignaturePad from './SignaturePad';
import { ReportData, TestResult } from '../types/ReportData';

interface InputFormProps {
  onSubmit: (data: ReportData) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    sex: 'Male' as 'Male' | 'Female' | 'Other',
    testDate: new Date().toISOString().split('T')[0],
    doctorName: '',
    testType: '',
    notes: '',
  });

  const [testResults, setTestResults] = useState<TestResult[]>([
    { id: '1', testName: 'Hemoglobin', result: '', referenceRange: '12.0-16.0', unit: 'g/dL' },
    { id: '2', testName: 'White Blood Cells', result: '', referenceRange: '4,000-11,000', unit: '/µL' },
    { id: '3', testName: 'Platelets', result: '', referenceRange: '150,000-450,000', unit: '/µL' }
  ]);

  const [signature, setSignature] = useState<string>('');
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTestResultChange = (id: string, field: string, value: string) => {
    setTestResults(testResults.map(test =>
      test.id === id ? { ...test, [field]: value } : test
    ));
  };

  const addTestResult = () => {
    const newTest: TestResult = {
      id: Date.now().toString(),
      testName: '',
      result: '',
      referenceRange: '',
      unit: ''
    };
    setTestResults([...testResults, newTest]);
  };

  const removeTestResult = (id: string) => {
    setTestResults(testResults.filter(test => test.id !== id));
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSignature(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureSave = (signatureData: string) => {
    setSignature(signatureData);
    setShowSignaturePad(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const reportData: ReportData = {
      ...formData,
      testResults,
      signature,
      reportId: `BR-${Date.now()}`,
      generatedDate: new Date().toLocaleString(),
    };

    onSubmit(reportData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Patient Information & Test Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Patient Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Patient Name *
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter patient's full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter age"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sex *
            </label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Test Date *
            </label>
            <input
              type="date"
              name="testDate"
              value={formData.testDate}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Doctor Name *
            </label>
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter doctor's name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Test Type *
            </label>
            <input
              type="text"
              name="testType"
              value={formData.testType}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., Complete Blood Count (CBC)"
            />
          </div>
        </div>

        {/* Test Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Test Results</h3>
            <button
              type="button"
              onClick={addTestResult}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Test
            </button>
          </div>

          <div className="space-y-4">
            {testResults.map((test, index) => (
              <div key={test.id} className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Test Name
                  </label>
                  <input
                    type="text"
                    value={test.testName}
                    onChange={(e) => handleTestResultChange(test.id, 'testName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Test name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Result
                  </label>
                  <input
                    type="text"
                    value={test.result}
                    onChange={(e) => handleTestResultChange(test.id, 'result', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Result value"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reference Range
                  </label>
                  <input
                    type="text"
                    value={test.referenceRange}
                    onChange={(e) => handleTestResultChange(test.id, 'referenceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Normal range"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={test.unit}
                    onChange={(e) => handleTestResultChange(test.id, 'unit', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Unit"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeTestResult(test.id)}
                    className="p-2 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Signature */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Doctor Signature</h3>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Signature
            </button>
            
            <button
              type="button"
              onClick={() => setShowSignaturePad(true)}
              className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Draw Signature
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleSignatureUpload}
            className="hidden"
          />

          {signature && (
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">Current Signature:</p>
              <img src={signature} alt="Signature" className="max-h-20 border rounded" />
              <button
                type="button"
                onClick={() => setSignature('')}
                className="mt-2 text-red-600 hover:text-red-800 text-sm"
              >
                Remove Signature
              </button>
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter any additional notes or observations..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-12 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            Generate Report Preview
          </button>
        </div>
      </form>

      {/* Signature Pad Modal */}
      {showSignaturePad && (
        <SignaturePad
          onSave={handleSignatureSave}
          onClose={() => setShowSignaturePad(false)}
        />
      )}
    </div>
  );
};

export default InputForm;