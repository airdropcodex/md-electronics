"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plus, Edit, Trash2, MapPin, Home, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface Address {
  id: string
  type: "home" | "work" | "other"
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  isDefault: boolean
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main Street",
      address2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
    {
      id: "2",
      type: "work",
      firstName: "John",
      lastName: "Doe",
      company: "Tech Corp",
      address1: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      phone: "+1 (555) 987-6543",
      isDefault: false,
    },
  ])

  const [showAddressModal, setShowAddressModal] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [loading, setLoading] = useState(false)

  const [addressForm, setAddressForm] = useState({
    type: "home" as "home" | "work" | "other",
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setAddressForm((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setAddressForm({
      type: "home",
      firstName: "",
      lastName: "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
      isDefault: false,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (editingAddress) {
        // Update existing address
        setAddresses((prev) =>
          prev.map((addr) =>
            addr.id === editingAddress.id
              ? { ...addressForm, id: editingAddress.id }
              : addressForm.isDefault
                ? { ...addr, isDefault: false }
                : addr,
          ),
        )
      } else {
        // Add new address
        const newAddress: Address = {
          ...addressForm,
          id: Date.now().toString(),
        }

        setAddresses((prev) => {
          if (newAddress.isDefault) {
            return [...prev.map((addr) => ({ ...addr, isDefault: false })), newAddress]
          }
          return [...prev, newAddress]
        })
      }

      setShowAddressModal(false)
      setEditingAddress(null)
      resetForm()
      setLoading(false)
    }, 1000)
  }

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setAddressForm({
      type: address.type,
      firstName: address.firstName,
      lastName: address.lastName,
      company: address.company || "",
      address1: address.address1,
      address2: address.address2 || "",
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone || "",
      isDefault: address.isDefault,
    })
    setShowAddressModal(true)
  }

  const handleDelete = (addressId: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId))
    }
  }

  const handleSetDefault = (addressId: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      })),
    )
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" />
      case "work":
        return <Building className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <Image
                src="/md-electronics-logo.png"
                alt="MD Electronics"
                width={200}
                height={50}
                className="h-10 sm:h-12 w-auto"
                priority
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/account/profile" className="text-gray-600 hover:text-blue-600 transition-colors">
                Profile
              </Link>
              <Link href="/account/orders" className="text-gray-600 hover:text-blue-600 transition-colors">
                Orders
              </Link>
              <Link href="/account/addresses" className="text-blue-600 font-medium">
                Addresses
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Addresses</h1>
              <p className="text-gray-600">Manage your shipping and billing addresses</p>
            </div>
            <Button
              onClick={() => {
                resetForm()
                setEditingAddress(null)
                setShowAddressModal(true)
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Address
            </Button>
          </div>

          {/* Addresses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <Card key={address.id} className="relative">
                {address.isDefault && (
                  <Badge className="absolute top-4 right-4 bg-green-100 text-green-800">Default</Badge>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    {getAddressIcon(address.type)}
                    <CardTitle className="text-lg capitalize">{address.type} Address</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-900">
                      {address.firstName} {address.lastName}
                    </p>
                    {address.company && <p className="text-sm text-gray-600">{address.company}</p>}
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p>{address.country}</p>
                    {address.phone && <p>{address.phone}</p>}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(address)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(address.id)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                    {!address.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Set as Default
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {addresses.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MapPin className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
                <p className="text-gray-600 text-center mb-6">
                  Add your first address to make checkout faster and easier.
                </p>
                <Button
                  onClick={() => {
                    resetForm()
                    setEditingAddress(null)
                    setShowAddressModal(true)
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Address
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Address Modal */}
      <Dialog open={showAddressModal} onOpenChange={setShowAddressModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
            <DialogDescription>
              {editingAddress
                ? "Update your address information below."
                : "Add a new address for shipping and billing."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="type">Address Type</Label>
              <Select
                value={addressForm.type}
                onValueChange={(value: "home" | "work" | "other") => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={addressForm.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={addressForm.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                value={addressForm.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="address1">Address Line 1 *</Label>
              <Input
                id="address1"
                value={addressForm.address1}
                onChange={(e) => handleInputChange("address1", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="address2">Address Line 2 (Optional)</Label>
              <Input
                id="address2"
                value={addressForm.address2}
                onChange={(e) => handleInputChange("address2", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={addressForm.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State/Province *</Label>
                <Input
                  id="state"
                  value={addressForm.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                <Input
                  id="zipCode"
                  value={addressForm.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Select value={addressForm.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={addressForm.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDefault"
                checked={addressForm.isDefault}
                onCheckedChange={(checked) => handleInputChange("isDefault", !!checked)}
              />
              <Label htmlFor="isDefault" className="cursor-pointer">
                Set as default address
              </Label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddressModal(false)
                  setEditingAddress(null)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editingAddress ? "Update Address" : "Add Address"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
