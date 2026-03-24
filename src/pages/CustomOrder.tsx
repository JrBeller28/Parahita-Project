import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, ChevronRight, ChevronLeft, Upload, Calculator } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const STEPS = [
  { id: 1, title: "Product Type" },
  { id: 2, title: "Material & Specs" },
  { id: 3, title: "Design Upload" },
  { id: 4, title: "Quantity & Review" },
]

const PRODUCT_TYPES = [
  { id: "shirt", name: "Corporate Shirt", basePrice: 150000 },
  { id: "polo", name: "Polo Shirt", basePrice: 85000 },
  { id: "jacket", name: "Jacket", basePrice: 200000 },
  { id: "tumbler", name: "Tumbler", basePrice: 45000 },
]

const MATERIALS: Record<string, { id: string, name: string, multiplier: number }[]> = {
  shirt: [
    { id: "drill", name: "American Drill", multiplier: 1 },
    { id: "oxford", name: "Oxford Cotton", multiplier: 1.2 },
    { id: "tropical", name: "Tropical", multiplier: 1.5 },
  ],
  polo: [
    { id: "lacoste", name: "Lacoste CVC", multiplier: 1 },
    { id: "pique", name: "Cotton Pique", multiplier: 1.3 },
  ],
  jacket: [
    { id: "taslan", name: "Taslan", multiplier: 1 },
    { id: "fleece", name: "Fleece", multiplier: 0.9 },
    { id: "canvas", name: "Canvas", multiplier: 1.2 },
  ],
  tumbler: [
    { id: "stainless", name: "Stainless Steel", multiplier: 1 },
    { id: "bamboo", name: "Bamboo Outer", multiplier: 1.5 },
  ]
}

export default function CustomOrder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    productType: "",
    material: "",
    quantity: 50,
    notes: "",
    fileUploaded: false
  })

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const calculateEstimate = () => {
    if (!formData.productType || !formData.material || !formData.quantity) return 0
    
    const basePrice = PRODUCT_TYPES.find(p => p.id === formData.productType)?.basePrice || 0
    const materials = MATERIALS[formData.productType] || []
    const multiplier = materials.find(m => m.id === formData.material)?.multiplier || 1
    
    // Simple volume discount logic
    let discount = 1
    if (formData.quantity >= 100) discount = 0.95
    if (formData.quantity >= 500) discount = 0.90
    if (formData.quantity >= 1000) discount = 0.85

    return Math.round(basePrice * multiplier * formData.quantity * discount)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Custom Order Simulator</h1>
          <p className="text-lg text-slate-600">
            Get an instant estimated price for your custom production needs.
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            ></div>
            
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                    currentStep >= step.id 
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle2 className="h-6 w-6" /> : step.id}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${currentStep >= step.id ? "text-primary" : "text-slate-500"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 overflow-hidden">
              <CardHeader className="bg-slate-900 text-white">
                <CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
                <CardDescription className="text-slate-300">
                  Step {currentStep} of {STEPS.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step 1: Product Type */}
                    {currentStep === 1 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {PRODUCT_TYPES.map(type => (
                          <button
                            key={type.id}
                            onClick={() => setFormData({ ...formData, productType: type.id, material: "" })}
                            className={`p-6 rounded-xl border-2 text-left transition-all ${
                              formData.productType === type.id 
                                ? "border-primary bg-primary/5 shadow-md" 
                                : "border-slate-200 hover:border-primary/50 hover:bg-slate-50"
                            }`}
                          >
                            <h3 className={`font-bold text-lg mb-2 ${formData.productType === type.id ? "text-primary" : "text-slate-900"}`}>
                              {type.name}
                            </h3>
                            <p className="text-sm text-slate-500">Starting from {formatCurrency(type.basePrice)}/pcs</p>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Step 2: Material */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        {!formData.productType ? (
                          <div className="text-center py-12 text-slate-500">
                            Please select a product type first.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {MATERIALS[formData.productType]?.map(mat => (
                              <button
                                key={mat.id}
                                onClick={() => setFormData({ ...formData, material: mat.id })}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${
                                  formData.material === mat.id 
                                    ? "border-primary bg-primary/5 shadow-md" 
                                    : "border-slate-200 hover:border-primary/50 hover:bg-slate-50"
                                }`}
                              >
                                <h3 className={`font-bold ${formData.material === mat.id ? "text-primary" : "text-slate-900"}`}>
                                  {mat.name}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">
                                  {mat.multiplier > 1 ? `Premium (+${Math.round((mat.multiplier - 1) * 100)}%)` : "Standard Base"}
                                </p>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 3: Design Upload */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer"
                             onClick={() => setFormData({...formData, fileUploaded: true})}>
                          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                            <Upload className="h-8 w-8" />
                          </div>
                          <h3 className="font-bold text-slate-900 mb-2">Upload your logo or design</h3>
                          <p className="text-sm text-slate-500 mb-4">Drag and drop or click to browse (PDF, AI, PNG, JPG)</p>
                          {formData.fileUploaded && (
                            <Badge className="bg-green-500 hover:bg-green-600">File uploaded successfully</Badge>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="notes">Additional Design Notes (Optional)</Label>
                          <Textarea 
                            id="notes" 
                            placeholder="E.g., Logo on left chest, website URL on back..."
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 4: Quantity & Review */}
                    {currentStep === 4 && (
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <Label htmlFor="qty" className="text-lg">Order Quantity</Label>
                          <div className="flex items-center gap-4">
                            <Input 
                              id="qty" 
                              type="number" 
                              min="50" 
                              step="10"
                              className="text-lg h-12 w-32"
                              value={formData.quantity}
                              onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 50})}
                            />
                            <span className="text-slate-500">pcs (Minimum 50 pcs)</span>
                          </div>
                          <p className="text-sm text-primary font-medium">
                            *Volume discounts apply for orders &gt; 100 pcs
                          </p>
                        </div>

                        <div className="bg-slate-100 p-6 rounded-xl space-y-3">
                          <h3 className="font-bold text-slate-900 border-b pb-2">Order Summary</h3>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Product</span>
                            <span className="font-medium">{PRODUCT_TYPES.find(p => p.id === formData.productType)?.name || "-"}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Material</span>
                            <span className="font-medium">
                              {formData.productType && MATERIALS[formData.productType]?.find(m => m.id === formData.material)?.name || "-"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Design</span>
                            <span className="font-medium">{formData.fileUploaded ? "Provided" : "Need Assistance"}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
              
              {/* Form Navigation */}
              <div className="p-6 border-t bg-slate-50 flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={handlePrev} 
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
                
                {currentStep < STEPS.length ? (
                  <Button 
                    onClick={handleNext} 
                    className="gap-2"
                    disabled={
                      (currentStep === 1 && !formData.productType) ||
                      (currentStep === 2 && !formData.material)
                    }
                  >
                    Next Step <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="accent" className="gap-2 px-8">
                    Submit Request
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Pricing Widget */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl border-primary/20">
              <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Calculator className="h-5 w-5" /> Estimated Total
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center py-6">
                  <p className="text-sm text-slate-500 mb-2">Total Estimated Price</p>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                    {calculateEstimate() > 0 ? formatCurrency(calculateEstimate()) : "Rp 0"}
                  </h2>
                  {calculateEstimate() > 0 && (
                    <p className="text-sm text-slate-500">
                      ~ {formatCurrency(Math.round(calculateEstimate() / formData.quantity))} / pcs
                    </p>
                  )}
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Disclaimer:</strong> This is a rough estimation. Final price may vary based on design complexity, exact material availability, and specific customization requirements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
