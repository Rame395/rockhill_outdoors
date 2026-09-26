'use client';

import Head from 'next/head'
import { useState } from 'react'
import { LogOut, Trash2, Filter, MapPin, Plus } from 'lucide-react'
import RichTextEditor from '@/components/rich-text-editor'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [learningSubmissions, setLearningSubmissions] = useState([])
  const [lifestyleSubmissions, setLifestyleSubmissions] = useState([])
  const [partnerSubmissions, setPartnerSubmissions] = useState([])
  const [selectedTab, setSelectedTab] = useState('learning')
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(false)
  const [announcementText, setAnnouncementText] = useState('')
  const [announcementEnabled, setAnnouncementEnabled] = useState(true)
  const [announcementSaving, setAnnouncementSaving] = useState(false)
  const [maps, setMaps] = useState([])
  const [mapTitle, setMapTitle] = useState('')
  const [mapLocation, setMapLocation] = useState('')
  const [mapLatitude, setMapLatitude] = useState('')
  const [mapLongitude, setMapLongitude] = useState('')
  const [mapSaving, setMapSaving] = useState(false)
  const [events, setEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingEventSlug, setEditingEventSlug] = useState(null)
  const [eventImageUploading, setEventImageUploading] = useState(false)
  const [eventImagePreview, setEventImagePreview] = useState('')
  const [eventForm, setEventForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: '',
    authorName: '',
    eventDate: ''
  })
  const [eventEnquiries, setEventEnquiries] = useState([])
  const [eventEnquiriesLoading, setEventEnquiriesLoading] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [blogsLoading, setBlogsLoading] = useState(false)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [editingBlogSlug, setEditingBlogSlug] = useState(null)
  const [blogImageUploading, setBlogImageUploading] = useState(false)
  const [blogImagePreview, setBlogImagePreview] = useState('')
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: '',
    authorName: '',
    publishedDate: ''
  })
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(false)
  const [contactSubmissions, setContactSubmissions] = useState([])
  const [contactSubmissionsLoading, setContactSubmissionsLoading] = useState(false)
  const [galleryImages, setGalleryImages] = useState([])
  const [galleryLoading, setGalleryLoading] = useState(false)
  const [galleryUploading, setGalleryUploading] = useState(false)
  
  // Hero Slides State
  const [heroSlides, setHeroSlides] = useState([])
  const [heroSlidesLoading, setHeroSlidesLoading] = useState(false)
  const [showHeroSlideForm, setShowHeroSlideForm] = useState(false)
  const [editingSlideId, setEditingSlideId] = useState(null)
  const [heroMediaUploading, setHeroMediaUploading] = useState(false)
  const [heroMediaPreview, setHeroMediaPreview] = useState('')
  const [heroSlideForm, setHeroSlideForm] = useState({
    media_type: 'image',
    media_url: '',
    title: '',
    subtitle: '',
    cta_text: '',
    cta_link: '',
    sort_order: 0,
    enabled: true
  })

  // Contact Info (Site Settings) State
  const [siteSettings, setSiteSettings] = useState({
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    contact_hours: ''
  })
  const [siteSettingsSaving, setSiteSettingsSaving] = useState(false)

  // Office Locations State
  const [officeLocations, setOfficeLocations] = useState([])
  const [officeLocationsLoading, setOfficeLocationsLoading] = useState(false)
  const [showLocationForm, setShowLocationForm] = useState(false)
  const [editingLocationId, setEditingLocationId] = useState(null)
  const [locationSaving, setLocationSaving] = useState(false)
  const [locationForm, setLocationForm] = useState({
    name: '',
    description: '',
    phone: '',
    sort_order: 0,
    enabled: true
  })

  // Categories State
  const [learningCategories, setLearningCategories] = useState([])
  const [learningCategoriesLoading, setLearningCategoriesLoading] = useState(false)
  const [lifestyleCategories, setLifestyleCategories] = useState([])
  const [lifestyleCategoriesLoading, setLifestyleCategoriesLoading] = useState(false)
  
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [editingCategoryType, setEditingCategoryType] = useState(null) // 'learning' or 'lifestyle'
  const [editingCategoryId, setEditingCategoryId] = useState(null)
  const [categorySaving, setCategorySaving] = useState(false)
  const [categoryForm, setCategoryForm] = useState({
    slug: '',
    name: '',
    description: '',
    icon_name: 'HelpCircle',
    sort_order: 0,
    enabled: true
  })

  // Simple authentication (in production, use proper auth)
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'RockHill!@1240') {
      setIsAuthenticated(true)
      setPassword('')
      loadSubmissions()
      loadAnnouncement()
      loadHeroSlides()
      loadMaps()
      loadEvents()
      loadEventEnquiries()
      loadBlogs()
      loadReviews()
      loadContactSubmissions()
      loadGallery()
      loadSiteSettings()
      loadOfficeLocations()
      loadLearningCategories()
      loadLifestyleCategories()
    } else {
      alert('Incorrect password')
      setPassword('')
    }
  }

  const loadSubmissions = async () => {
    setLoading(true)
    try {
      const [learningRes, lifestyleRes, partnerRes] = await Promise.all([
        fetch('/api/learning-submission'),
        fetch('/api/lifestyle-submission'),
        fetch('/api/partner-submission')
      ])

      if (learningRes.ok) {
        const data = await learningRes.json()
        setLearningSubmissions(data.submissions || [])
      }

      if (lifestyleRes.ok) {
        const data = await lifestyleRes.json()
        setLifestyleSubmissions(data.submissions || [])
      }

      if (partnerRes.ok) {
        const data = await partnerRes.json()
        setPartnerSubmissions(data.submissions || [])
      }
    } catch (error) {
      console.error('Error loading submissions:', error)
    }
    setLoading(false)
  }

  const loadAnnouncement = async () => {
    try {
      const res = await fetch('/api/announcement')
      if (res.ok) {
        const data = await res.json()
        setAnnouncementText(data.text || '')
        setAnnouncementEnabled(Boolean(data.enabled))
      }
    } catch (error) {
      console.error('Error loading announcement:', error)
    }
  }

  const loadHeroSlides = async () => {
    setHeroSlidesLoading(true)
    try {
      const res = await fetch('/api/hero-slides')
      if (res.ok) {
        const data = await res.json()
        setHeroSlides(data || [])
      }
    } catch (error) {
      console.error('Error loading hero slides:', error)
    }
    setHeroSlidesLoading(false)
  }

  const handleHeroMediaUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setHeroMediaUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload/hero-media', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (res.ok) {
        setHeroSlideForm({ ...heroSlideForm, media_url: data.filePath })
        setHeroMediaPreview(data.filePath)
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    }
    setHeroMediaUploading(false)
  }

  const saveHeroSlide = async (e) => {
    e.preventDefault()
    try {
      const url = editingSlideId ? `/api/hero-slides/${editingSlideId}` : '/api/hero-slides'
      const method = editingSlideId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroSlideForm)
      })

      if (res.ok) {
        setShowHeroSlideForm(false)
        resetHeroSlideForm()
        loadHeroSlides()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to save slide')
      }
    } catch (error) {
      console.error('Error saving slide:', error)
      alert('Failed to save slide')
    }
  }

  const deleteHeroSlide = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return
    try {
      const res = await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' })
      if (res.ok) {
        loadHeroSlides()
      }
    } catch (error) {
      console.error('Error deleting slide:', error)
    }
  }

  const resetHeroSlideForm = () => {
    setEditingSlideId(null)
    setHeroMediaPreview('')
    setHeroSlideForm({
      media_type: 'image',
      media_url: '',
      title: '',
      subtitle: '',
      cta_text: '',
      cta_link: '',
      sort_order: 0,
      enabled: true
    })
  }

  const startEditHeroSlide = (slide) => {
    setEditingSlideId(slide.id)
    setHeroSlideForm({
      media_type: slide.media_type || 'image',
      media_url: slide.media_url || '',
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      cta_text: slide.cta_text || '',
      cta_link: slide.cta_link || '',
      sort_order: slide.sort_order || 0,
      enabled: Boolean(slide.enabled)
    })
    setHeroMediaPreview(slide.media_url)
    setShowHeroSlideForm(true)
  }

  const loadMaps = async () => {
    try {
      const res = await fetch('/api/maps')
      if (res.ok) {
        const data = await res.json()
        setMaps(data.maps || [])
      }
    } catch (error) {
      console.error('Error loading maps:', error)
    }
  }

  const loadEvents = async () => {
    setEventsLoading(true)
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '50'
      })
      const res = await fetch(`/api/events?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Error loading events:', error)
    }
    setEventsLoading(false)
  }

  const loadEventEnquiries = async () => {
    setEventEnquiriesLoading(true)
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '100'
      })
      const res = await fetch(`/api/event-enquiry?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setEventEnquiries(data.enquiries || [])
      }
    } catch (error) {
      console.error('Error loading event enquiries:', error)
    }
    setEventEnquiriesLoading(false)
  }

  const loadBlogs = async () => {
    setBlogsLoading(true)
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '50'
      })
      const res = await fetch(`/api/blogs?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setBlogs(data.blogs || [])
      }
    } catch (error) {
      console.error('Error loading blogs:', error)
    }
    setBlogsLoading(false)
  }

  const loadReviews = async () => {
    setReviewsLoading(true)
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '100'
      })
      const res = await fetch(`/api/admin/reviews?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setReviews(data.reviews || [])
      }
    } catch (error) {
      console.error('Error loading reviews:', error)
    }
    setReviewsLoading(false)
  }

  const loadContactSubmissions = async () => {
    setContactSubmissionsLoading(true)
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '100'
      })
      const res = await fetch(`/api/contact-submission?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setContactSubmissions(data.submissions || [])
      }
    } catch (error) {
      console.error('Error loading contact submissions:', error)
    }
    setContactSubmissionsLoading(false)
  }

  const loadGallery = async () => {
    setGalleryLoading(true)
    try {
      const res = await fetch('/api/gallery')
      if (res.ok) {
        const data = await res.json()
        setGalleryImages(data.images || [])
      }
    } catch (error) {
      console.error('Error loading gallery:', error)
    }
    setGalleryLoading(false)
  }

  // --- Site Settings (Contact Info) ---
  const loadSiteSettings = async () => {
    try {
      const res = await fetch('/api/site-settings')
      if (res.ok) {
        const data = await res.json()
        setSiteSettings({
          contact_email: data.contact_email || '',
          contact_phone: data.contact_phone || '',
          contact_address: data.contact_address || '',
          contact_hours: data.contact_hours || ''
        })
      }
    } catch (error) {
      console.error('Error loading site settings:', error)
    }
  }

  const saveSiteSettings = async (e) => {
    e.preventDefault()
    setSiteSettingsSaving(true)
    try {
      const res = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings)
      })
      if (res.ok) {
        alert('Contact info saved successfully!')
      } else {
        alert('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error saving settings')
    }
    setSiteSettingsSaving(false)
  }

  // --- Office Locations ---
  const loadOfficeLocations = async () => {
    setOfficeLocationsLoading(true)
    try {
      const res = await fetch('/api/office-locations')
      if (res.ok) {
        const data = await res.json()
        setOfficeLocations(data || [])
      }
    } catch (error) {
      console.error('Error loading locations:', error)
    }
    setOfficeLocationsLoading(false)
  }

  const resetLocationForm = () => {
    setLocationForm({ name: '', description: '', phone: '', sort_order: 0, enabled: true })
    setEditingLocationId(null)
    setShowLocationForm(false)
  }

  const startEditLocation = (loc) => {
    setLocationForm({
      name: loc.name,
      description: loc.description || '',
      phone: loc.phone || '',
      sort_order: loc.sort_order || 0,
      enabled: loc.enabled !== false
    })
    setEditingLocationId(loc.id)
    setShowLocationForm(true)
  }

  const saveLocation = async (e) => {
    e.preventDefault()
    setLocationSaving(true)
    try {
      const url = editingLocationId ? `/api/office-locations/${editingLocationId}` : '/api/office-locations'
      const method = editingLocationId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(locationForm)
      })
      if (res.ok) {
        await loadOfficeLocations()
        resetLocationForm()
      } else {
        alert('Failed to save location')
      }
    } catch (error) {
      console.error('Error saving location:', error)
    }
    setLocationSaving(false)
  }

  const deleteLocation = async (id) => {
    if (!confirm('Delete this location?')) return
    try {
      const res = await fetch(`/api/office-locations/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await loadOfficeLocations()
      } else {
        alert('Failed to delete location')
      }
    } catch (error) {
      console.error('Error deleting location:', error)
    }
  }

  // --- Categories (Learning & Lifestyle) ---
  const loadLearningCategories = async () => {
    setLearningCategoriesLoading(true)
    try {
      const res = await fetch('/api/learning-categories')
      if (res.ok) {
        const data = await res.json()
        setLearningCategories(data || [])
      }
    } catch (error) {
      console.error('Error loading learning categories:', error)
    }
    setLearningCategoriesLoading(false)
  }

  const loadLifestyleCategories = async () => {
    setLifestyleCategoriesLoading(true)
    try {
      const res = await fetch('/api/lifestyle-categories')
      if (res.ok) {
        const data = await res.json()
        setLifestyleCategories(data || [])
      }
    } catch (error) {
      console.error('Error loading lifestyle categories:', error)
    }
    setLifestyleCategoriesLoading(false)
  }

  const resetCategoryForm = () => {
    setCategoryForm({ slug: '', name: '', description: '', icon_name: 'HelpCircle', sort_order: 0, enabled: true })
    setEditingCategoryId(null)
    setEditingCategoryType(null)
    setShowCategoryForm(false)
  }

  const startEditCategory = (cat, type) => {
    setCategoryForm({
      slug: cat.slug,
      name: cat.name,
      description: cat.description || '',
      icon_name: cat.icon_name || 'HelpCircle',
      sort_order: cat.sort_order || 0,
      enabled: cat.enabled !== false
    })
    setEditingCategoryId(cat.id)
    setEditingCategoryType(type)
    setShowCategoryForm(true)
  }

  const startCreateCategory = (type) => {
    resetCategoryForm()
    setEditingCategoryType(type)
    setShowCategoryForm(true)
  }

  const saveCategory = async (e) => {
    e.preventDefault()
    setCategorySaving(true)
    try {
      const endpoint = editingCategoryType === 'learning' ? '/api/learning-categories' : '/api/lifestyle-categories'
      const url = editingCategoryId ? `${endpoint}/${editingCategoryId}` : endpoint
      const method = editingCategoryId ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      })
      if (res.ok) {
        if (editingCategoryType === 'learning') {
          await loadLearningCategories()
        } else {
          await loadLifestyleCategories()
        }
        resetCategoryForm()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to save category')
      }
    } catch (error) {
      console.error('Error saving category:', error)
      alert('Error saving category')
    }
    setCategorySaving(false)
  }

  const deleteCategory = async (id, type) => {
    if (!confirm(`Delete this ${type} category?`)) return
    try {
      const endpoint = type === 'learning' ? '/api/learning-categories' : '/api/lifestyle-categories'
      const res = await fetch(`${endpoint}/${id}`, { method: 'DELETE' })
      if (res.ok) {
        if (type === 'learning') await loadLearningCategories()
        else await loadLifestyleCategories()
      } else {
        alert('Failed to delete category')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }


  const handleGalleryUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setGalleryUploading(true)
    try {
      // Determine if file is video or image
      const isVideo = file.type.startsWith('video/')
      const uploadEndpoint = isVideo ? '/api/upload/gallery-video' : '/api/uploads/gallery'
      
      // Upload file
      const formData = new FormData()
      formData.append('file', file)

      const uploadRes = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) {
        throw new Error('Failed to upload file')
      }

      const uploadData = await uploadRes.json()

      // Save to database
      const saveRes = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: uploadData.filename,
          originalFilename: uploadData.originalFilename,
          filePath: uploadData.filePath,
          fileSize: uploadData.fileSize,
          mimeType: uploadData.mimeType,
          mediaType: uploadData.mediaType,
        }),
      })

      if (saveRes.ok) {
        await loadGallery()
        alert(`${isVideo ? 'Video' : 'Image'} uploaded successfully!`)
      } else {
        throw new Error('Failed to save file')
      }
    } catch (error) {
      console.error('Error uploading gallery file:', error)
      alert('Failed to upload file. Please try again.')
    } finally {
      setGalleryUploading(false)
      e.target.value = '' // Reset file input
    }
  }

  const deleteGalleryImage = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        await loadGallery()
        alert('Image deleted successfully!')
      } else {
        throw new Error('Failed to delete image')
      }
    } catch (error) {
      console.error('Error deleting gallery image:', error)
      alert('Failed to delete image. Please try again.')
    }
  }

  const resetEventForm = () => {
    setEventForm({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      featuredImage: '',
      authorName: '',
      eventDate: ''
    })
    setEditingEventSlug(null)
  }

  const saveEvent = async (e) => {
    e.preventDefault()

    const { title, excerpt, content, category, tags, featuredImage, authorName, eventDate } = eventForm

    if (!title || !content) {
      alert('Title and content are required')
      return
    }

    try {
      const isEditing = Boolean(editingEventSlug)
      const url = isEditing ? `/api/events/${editingEventSlug}` : '/api/events'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          category,
          tags,
          featuredImage,
          authorName,
          eventDate: eventDate || null
        })
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        alert(error.error || 'Failed to save event')
        return
      }

      resetEventForm()
      setShowEventForm(false)
      await loadEvents()
    } catch (error) {
      console.error('Error saving event:', error)
      alert('Error saving event')
    }
  }

  const startCreateEvent = () => {
    resetEventForm()
    setShowEventForm(true)
  }

  const startEditEvent = (event) => {
    // Debug: Log the event data to ensure content is present
    console.log('Editing event:', event);
    console.log('Event content:', event.content);
    
    // Ensure all fields are properly set with fallbacks to preserve existing data
    setEventForm({
      title: event.title || '',
      excerpt: event.excerpt || '',
      content: event.content || '',
      category: event.category || '',
      tags: event.tags || '',
      featuredImage: event.featuredImage || '',
      authorName: event.authorName || '',
      eventDate: event.eventDate ? event.eventDate.split('T')[0] : ''
    })
    setEventImagePreview(event.featuredImage || '')
    setEditingEventSlug(event.slug)
    setShowEventForm(true)
  }

  const deleteEvent = async (slug) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return
    }

    try {
      const res = await fetch(`/api/events/${slug}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        alert('Failed to delete event')
        return
      }

      await loadEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Error deleting event')
    }
  }

  const handleEventImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Enforce 5 MB max on client before uploading
    const fiveMB = 5 * 1024 * 1024
    if (file.size > fiveMB) {
      alert('Image file shouuld be less than 5 mb')
      e.target.value = ''
      return
    }

    setEventImageUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload/event-image', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        alert(error.error || 'Failed to upload image')
        return
      }

      const data = await res.json()
      const imagePath = data.image_path || data.path
      setEventForm((prev) => ({
        ...prev,
        featuredImage: imagePath || ''
      }))
      setEventImagePreview(imagePath || '')
    } catch (error) {
      console.error('Error uploading event image:', error)
      alert('Failed to upload image')
    }
    setEventImageUploading(false)
  }

  // Blog management functions
  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      featuredImage: '',
      authorName: '',
      publishedDate: ''
    })
    setEditingBlogSlug(null)
    setBlogImagePreview('')
  }

  const saveBlog = async (e) => {
    e.preventDefault()
    const { title, excerpt, content, category, tags, featuredImage, authorName, publishedDate } = blogForm
    if (!title || !content) {
      alert('Title and content are required')
      return
    }
    try {
      const isEditing = Boolean(editingBlogSlug)
      const url = isEditing ? `/api/blogs/${editingBlogSlug}` : '/api/blogs'
      const method = isEditing ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, excerpt, content, category, tags, featuredImage, authorName,
          publishedDate: publishedDate || null
        })
      })
      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        alert(error.error || 'Failed to save blog')
        return
      }
      resetBlogForm()
      setShowBlogForm(false)
      await loadBlogs()
    } catch (error) {
      console.error('Error saving blog:', error)
      alert('Error saving blog')
    }
  }

  const startCreateBlog = () => {
    resetBlogForm()
    setShowBlogForm(true)
  }

  const startEditBlog = (blog) => {
    setBlogForm({
      title: blog.title || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || '',
      tags: blog.tags || '',
      featuredImage: blog.featuredImage || '',
      authorName: blog.authorName || '',
      publishedDate: blog.publishedDate ? blog.publishedDate.split('T')[0] : ''
    })
    setEditingBlogSlug(blog.slug)
    setBlogImagePreview(blog.featuredImage || '')
    setShowBlogForm(true)
  }

  const deleteBlog = async (slug) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: 'DELETE' })
      if (!res.ok) {
        alert('Failed to delete blog')
        return
      }
      await loadBlogs()
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Error deleting blog')
    }
  }

  const handleBlogImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBlogImageUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload/blog-image', {
        method: 'POST',
        body: formData
      })
      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        alert(error.error || 'Failed to upload image')
        return
      }
      const data = await res.json()
      const imagePath = data.image_path || data.path
      setBlogForm((prev) => ({ ...prev, featuredImage: imagePath || '' }))
      setBlogImagePreview(imagePath || '')
    } catch (error) {
      console.error('Error uploading blog image:', error)
      alert('Failed to upload image')
    }
    setBlogImageUploading(false)
  }

  const addMap = async (e) => {
    e.preventDefault()
    setMapSaving(true)
    try {
      const res = await fetch('/api/maps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: mapTitle,
          location: mapLocation,
          latitude: parseFloat(mapLatitude),
          longitude: parseFloat(mapLongitude)
        })
      })

      if (res.ok) {
        setMapTitle('')
        setMapLocation('')
        setMapLatitude('')
        setMapLongitude('')
        await loadMaps()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to add map')
      }
    } catch (error) {
      console.error('Error adding map:', error)
      alert('Error adding map')
    }
    setMapSaving(false)
  }

  const deleteMap = async (id) => {
    if (!confirm('Are you sure you want to delete this map location?')) {
      return
    }

    try {
      const res = await fetch(`/api/maps?id=${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        await loadMaps()
      } else {
        alert('Failed to delete map')
      }
    } catch (error) {
      console.error('Error deleting map:', error)
      alert('Error deleting map')
    }
  }

  const saveAnnouncement = async (e) => {
    e.preventDefault()
    setAnnouncementSaving(true)
    try {
      const res = await fetch('/api/announcement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled: announcementEnabled,
          text: announcementText
        })
      })

      if (!res.ok) {
        alert('Failed to save announcement')
      }
    } catch (error) {
      console.error('Error saving announcement:', error)
      alert('Error saving announcement')
    }
    setAnnouncementSaving(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLearningSubmissions([])
    setLifestyleSubmissions([])
    setPartnerSubmissions([])
    setPassword('')
  }

  const deleteSubmission = async (id, type) => {
    if (!confirm('Are you sure you want to delete this submission?')) {
      return
    }

    try {
      const res = await fetch(`/api/${type}-submission?id=${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        // Reload submissions to reflect the deletion
        await loadSubmissions()
      } else {
        alert('Failed to delete submission')
      }
    } catch (error) {
      console.error('Error deleting submission:', error)
      alert('Error deleting submission')
    }
  }

  const getFilteredSubmissions = (submissions) => {
    if (filterStatus === 'all') return submissions
    return submissions.filter(s => s.status === filterStatus)
  }

  const getCurrentSubmissions = () => {
    let submissions = []
    if (selectedTab === 'learning') {
      submissions = learningSubmissions
    } else if (selectedTab === 'lifestyle') {
      submissions = lifestyleSubmissions
    } else if (selectedTab === 'partner') {
      submissions = partnerSubmissions
    }
    return getFilteredSubmissions(submissions)
  }

  const currentSubmissions = getCurrentSubmissions()

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin - Rockhill Outdoors</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Rockhill Outdoors</h1>
              <p className="text-gray-600 text-center mb-8">Admin Dashboard</p>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    placeholder="Enter admin password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Login to Dashboard
                </button>
              </form>

            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Rockhill Outdoors</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Manage form submissions</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Announcement settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Announcement Bar</h2>
                <p className="text-sm text-gray-600">
                  Control the green announcement bar that appears above the main menu.
                </p>
              </div>
              <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
                  checked={announcementEnabled}
                  onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                />
                Show announcement
              </label>
            </div>

            <form onSubmit={saveAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Announcement text
                </label>
                <textarea
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  placeholder="Add a short announcement to display across the site..."
                />
              </div>
              <button
                type="submit"
                disabled={announcementSaving}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-60"
              >
                {announcementSaving ? 'Saving...' : 'Save Announcement'}
              </button>
            </form>
          </div>

          {/* Contact Info (Site Settings) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
              <p className="text-sm text-gray-600">Update the contact details shown on the Contact page (email, phone, address, hours).</p>
            </div>
            <form onSubmit={saveSiteSettings} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
                  <input
                    type="email"
                    value={siteSettings.contact_email}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contact_email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Phone</label>
                  <input
                    type="text"
                    value={siteSettings.contact_phone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contact_phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="+977 970-4800736"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Address</label>
                  <input
                    type="text"
                    value={siteSettings.contact_address}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contact_address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Kathmandu, Nepal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Business Hours</label>
                  <input
                    type="text"
                    value={siteSettings.contact_hours}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contact_hours: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="5 AM to 8 PM throughout the week."
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={siteSettingsSaving}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-60"
              >
                {siteSettingsSaving ? 'Saving...' : 'Save Contact Info'}
              </button>
            </form>
          </div>

          {/* Office Locations */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Office Locations</h2>
                <p className="text-sm text-gray-600">Manage the Additional Locations section on the Contact page.</p>
              </div>
              <button
                onClick={() => { resetLocationForm(); setShowLocationForm(true); }}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus size={16} /> Add Location
              </button>
            </div>

            {showLocationForm && (
              <form onSubmit={saveLocation} className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                <h3 className="font-semibold text-gray-900">{editingLocationId ? 'Edit Location' : 'New Location'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Location Name *</label>
                    <input
                      type="text"
                      required
                      value={locationForm.name}
                      onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g. Dharan, Sunsari"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={locationForm.phone}
                      onChange={(e) => setLocationForm({ ...locationForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="+977 9704800736"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={locationForm.description}
                    onChange={(e) => setLocationForm({ ...locationForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Short description of this office..."
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={locationForm.sort_order}
                      onChange={(e) => setLocationForm({ ...locationForm, sort_order: parseInt(e.target.value) || 0 })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mt-5">
                    <input
                      type="checkbox"
                      checked={locationForm.enabled}
                      onChange={(e) => setLocationForm({ ...locationForm, enabled: e.target.checked })}
                      className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
                    />
                    Visible on site
                  </label>
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={locationSaving} className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-60">
                    {locationSaving ? 'Saving...' : (editingLocationId ? 'Update Location' : 'Add Location')}
                  </button>
                  <button type="button" onClick={resetLocationForm} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {officeLocationsLoading ? (
              <p className="text-sm text-gray-500">Loading locations...</p>
            ) : officeLocations.length === 0 ? (
              <p className="text-sm text-gray-500">No locations added yet. Click "Add Location" to get started.</p>
            ) : (
              <div className="space-y-3">
                {officeLocations.map((loc) => (
                  <div key={loc.id} className="flex items-start justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 flex items-center gap-2">
                        <MapPin size={14} className="text-emerald-600" />
                        {loc.name}
                        {!loc.enabled && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Hidden</span>}
                      </p>
                      {loc.description && <p className="text-sm text-gray-600 mt-1">{loc.description}</p>}
                      {loc.phone && <p className="text-sm text-emerald-700 mt-1">{loc.phone}</p>}
                    </div>
                    <div className="flex gap-2 shrink-0 ml-4">
                      <button onClick={() => startEditLocation(loc)} className="px-3 py-1 text-xs bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100">Edit</button>
                      <button onClick={() => deleteLocation(loc.id)} className="px-3 py-1 text-xs bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>


          {/* Learning Categories Management */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Learning Categories</h2>
                <p className="text-sm text-gray-600">Manage categories shown in the Learning dropdown and page.</p>
              </div>
              <button
                onClick={() => startCreateCategory('learning')}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus size={16} /> Add Category
              </button>
            </div>

            {showCategoryForm && editingCategoryType === 'learning' && (
              <form onSubmit={saveCategory} className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                <h3 className="font-semibold text-gray-900">{editingCategoryId ? 'Edit Category' : 'New Category'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Slug *</label>
                    <input
                      type="text"
                      required
                      value={categoryForm.slug}
                      onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Icon Name *</label>
                    <select
                      value={categoryForm.icon_name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, icon_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="Brain">Brain</option>
                      <option value="MessageSquare">MessageSquare</option>
                      <option value="Compass">Compass</option>
                      <option value="BarChart">BarChart</option>
                      <option value="Sparkles">Sparkles</option>
                      <option value="Palette">Palette</option>
                      <option value="Dribbble">Dribbble</option>
                      <option value="Mountain">Mountain</option>
                      <option value="Plane">Plane</option>
                      <option value="Trophy">Trophy</option>
                      <option value="HelpCircle">HelpCircle</option>
                      <option value="Star">Star</option>
                      <option value="Heart">Heart</option>
                      <option value="Map">Map</option>
                      <option value="Activity">Activity</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={categoryForm.sort_order}
                      onChange={(e) => setCategoryForm({ ...categoryForm, sort_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div className="pb-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={categoryForm.enabled}
                        onChange={(e) => setCategoryForm({ ...categoryForm, enabled: e.target.checked })}
                        className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
                      />
                      Visible on site
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={categorySaving} className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-60">
                    {categorySaving ? 'Saving...' : 'Save Category'}
                  </button>
                  <button type="button" onClick={resetCategoryForm} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {learningCategoriesLoading ? (
              <p className="text-sm text-gray-500">Loading categories...</p>
            ) : (
              <div className="space-y-3">
                {learningCategories.map((cat) => (
                  <div key={cat.id} className="flex items-start justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 flex items-center gap-2">
                        {cat.name}
                        {!cat.enabled && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Hidden</span>}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Slug: {cat.slug} | Icon: {cat.icon_name} | Order: {cat.sort_order}</p>
                      {cat.description && <p className="text-sm text-gray-600 mt-1">{cat.description}</p>}
                    </div>
                    <div className="flex gap-2 shrink-0 ml-4">
                      <button onClick={() => startEditCategory(cat, 'learning')} className="px-3 py-1 text-xs bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100">Edit</button>
                      <button onClick={() => deleteCategory(cat.id, 'learning')} className="px-3 py-1 text-xs bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lifestyle Categories Management */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Lifestyle Categories</h2>
                <p className="text-sm text-gray-600">Manage categories shown in the Lifestyle dropdown and page.</p>
              </div>
              <button
                onClick={() => startCreateCategory('lifestyle')}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus size={16} /> Add Category
              </button>
            </div>

            {showCategoryForm && editingCategoryType === 'lifestyle' && (
              <form onSubmit={saveCategory} className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                <h3 className="font-semibold text-gray-900">{editingCategoryId ? 'Edit Category' : 'New Category'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Slug *</label>
                    <input
                      type="text"
                      required
                      value={categoryForm.slug}
                      onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Icon Name *</label>
                    <select
                      value={categoryForm.icon_name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, icon_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="Brain">Brain</option>
                      <option value="MessageSquare">MessageSquare</option>
                      <option value="Compass">Compass</option>
                      <option value="BarChart">BarChart</option>
                      <option value="Sparkles">Sparkles</option>
                      <option value="Palette">Palette</option>
                      <option value="Dribbble">Dribbble</option>
                      <option value="Mountain">Mountain</option>
                      <option value="Plane">Plane</option>
                      <option value="Trophy">Trophy</option>
                      <option value="HelpCircle">HelpCircle</option>
                      <option value="Star">Star</option>
                      <option value="Heart">Heart</option>
                      <option value="Map">Map</option>
                      <option value="Activity">Activity</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={categoryForm.sort_order}
                      onChange={(e) => setCategoryForm({ ...categoryForm, sort_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div className="pb-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={categoryForm.enabled}
                        onChange={(e) => setCategoryForm({ ...categoryForm, enabled: e.target.checked })}
                        className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
                      />
                      Visible on site
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={categorySaving} className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-60">
                    {categorySaving ? 'Saving...' : 'Save Category'}
                  </button>
                  <button type="button" onClick={resetCategoryForm} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {lifestyleCategoriesLoading ? (
              <p className="text-sm text-gray-500">Loading categories...</p>
            ) : (
              <div className="space-y-3">
                {lifestyleCategories.map((cat) => (
                  <div key={cat.id} className="flex items-start justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900 flex items-center gap-2">
                        {cat.name}
                        {!cat.enabled && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Hidden</span>}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Slug: {cat.slug} | Icon: {cat.icon_name} | Order: {cat.sort_order}</p>
                      {cat.description && <p className="text-sm text-gray-600 mt-1">{cat.description}</p>}
                    </div>
                    <div className="flex gap-2 shrink-0 ml-4">
                      <button onClick={() => startEditCategory(cat, 'lifestyle')} className="px-3 py-1 text-xs bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100">Edit</button>
                      <button onClick={() => deleteCategory(cat.id, 'lifestyle')} className="px-3 py-1 text-xs bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hero Slides Management */}

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Hero Slides Management</h2>
                <p className="text-sm text-gray-600">Manage images and videos for the homepage hero carousel.</p>
              </div>
              <button
                onClick={() => setShowHeroSlideForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus size={18} />
                New Slide
              </button>
            </div>

            {showHeroSlideForm && (
              <form onSubmit={saveHeroSlide} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Media Type</label>
                    <select
                      value={heroSlideForm.media_type}
                      onChange={(e) => setHeroSlideForm({ ...heroSlideForm, media_type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={heroSlideForm.sort_order}
                      onChange={(e) => setHeroSlideForm({ ...heroSlideForm, sort_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Upload Media <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept={heroSlideForm.media_type === 'video' ? "video/*" : "image/*"}
                      onChange={handleHeroMediaUpload}
                      disabled={heroMediaUploading}
                      className="block w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white cursor-pointer"
                    />
                    {heroMediaUploading && <p className="mt-1 text-xs text-gray-500">Uploading...</p>}
                    {heroMediaPreview && (
                      <div className="mt-2">
                        {heroSlideForm.media_type === 'video' ? (
                          <video src={heroMediaPreview} className="h-32 rounded object-cover" muted autoPlay loop />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={heroMediaPreview} alt="Preview" className="h-32 rounded object-cover" />
                        )}
                        <span className="block text-xs text-gray-500 break-all mt-1">{heroMediaPreview}</span>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Title</label>
                    <input
                      type="text"
                      value={heroSlideForm.title}
                      onChange={(e) => setHeroSlideForm({ ...heroSlideForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Subtitle</label>
                    <textarea
                      value={heroSlideForm.subtitle}
                      onChange={(e) => setHeroSlideForm({ ...heroSlideForm, subtitle: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Button Text (Optional)</label>
                    <input
                      type="text"
                      value={heroSlideForm.cta_text}
                      onChange={(e) => setHeroSlideForm({ ...heroSlideForm, cta_text: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Button Link (Optional)</label>
                    <input
                      type="text"
                      value={heroSlideForm.cta_link}
                      onChange={(e) => setHeroSlideForm({ ...heroSlideForm, cta_link: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="e.g. /learning"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center">
                    <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={heroSlideForm.enabled}
                        onChange={(e) => setHeroSlideForm({ ...heroSlideForm, enabled: e.target.checked })}
                        className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
                      />
                      Enable Slide
                    </label>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={!heroSlideForm.media_url}
                    className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {editingSlideId ? 'Update Slide' : 'Save Slide'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowHeroSlideForm(false)
                      resetHeroSlideForm()
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {heroSlidesLoading ? (
              <p className="text-sm text-gray-500">Loading hero slides...</p>
            ) : heroSlides.length === 0 ? (
              <p className="text-sm text-gray-500">No hero slides yet. Add one to show on the homepage.</p>
            ) : (
              <div className="space-y-2">
                {heroSlides.map((slide) => (
                  <div key={slide.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      {slide.media_type === 'video' ? (
                        <video src={slide.media_url} className="h-16 w-24 rounded object-cover" muted />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={slide.media_url} className="h-16 w-24 rounded object-cover" alt={slide.title || 'Slide'} />
                      )}
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {slide.title || 'Untitled Slide'}
                          {!slide.enabled && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">Disabled</span>}
                        </div>
                        <div className="text-xs text-gray-500">Order: {slide.sort_order} | Type: {slide.media_type}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditHeroSlide(slide)}
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteHeroSlide(slide.id)}
                        className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Maps management */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Maps Management
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Add and manage map locations that will be displayed on the maps page.
              </p>
            </div>

            <form onSubmit={addMap} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={mapTitle}
                    onChange={(e) => setMapTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="e.g., Learning Center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={mapLocation}
                    onChange={(e) => setMapLocation(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="e.g., Kathmandu, Nepal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Latitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={mapLatitude}
                    onChange={(e) => setMapLatitude(e.target.value)}
                    required
                    min="-90"
                    max="90"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="e.g., 27.7172"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Longitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={mapLongitude}
                    onChange={(e) => setMapLongitude(e.target.value)}
                    required
                    min="-180"
                    max="180"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    placeholder="e.g., 85.3240"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={mapSaving}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-60"
              >
                <Plus size={18} />
                {mapSaving ? 'Adding...' : 'Add Map Location'}
              </button>
            </form>

            {/* Maps list */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Existing Maps ({maps.length})</h3>
              {maps.length === 0 ? (
                <p className="text-sm text-gray-600 py-4">No maps added yet.</p>
              ) : (
                <div className="space-y-2">
                  {maps.map((map) => (
                    <div
                      key={map.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{map.title}</div>
                        <div className="text-sm text-gray-600">{map.location}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {map.latitude}, {map.longitude}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteMap(map.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors"
                        title="Delete map"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Events management */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Events</h2>
                <p className="text-sm text-gray-600">
                  Create and manage events that will be shown on the public events page.
                </p>
              </div>
              <button
                onClick={startCreateEvent}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus size={18} />
                New Event
              </button>
            </div>

            {showEventForm && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="text-md font-semibold text-gray-900 mb-3">
                  {editingEventSlug ? 'Edit Event' : 'Create New Event'}
                </h3>
                <form onSubmit={saveEvent} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={eventForm.title}
                        onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        placeholder="Event title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Event Date
                      </label>
                      <input
                        type="date"
                        value={eventForm.eventDate}
                        onChange={(e) => setEventForm(prev => ({ ...prev, eventDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={eventForm.category}
                        onChange={(e) => setEventForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        placeholder="e.g., Workshop, Trip"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Tags
                      </label>
                      <input
                        type="text"
                        value={eventForm.tags}
                        onChange={(e) => setEventForm(prev => ({ ...prev, tags: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        placeholder="Comma separated tags"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={eventForm.authorName}
                        onChange={(e) => setEventForm(prev => ({ ...prev, authorName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        placeholder="Who is publishing this event?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">
                        Featured Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEventImageUpload}
                        disabled={eventImageUploading}
                        className="block w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white cursor-pointer"
                      />
                      {eventImageUploading && (
                        <p className="mt-1 text-xs text-gray-500">Uploading image...</p>
                      )}
                      {eventImagePreview && (
                        <div className="mt-2 flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={eventImagePreview}
                            alt="Event preview"
                            className="h-16 w-16 object-cover rounded"
                          />
                          <span className="text-xs text-gray-500 break-all">
                            {eventForm.featuredImage}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Excerpt
                    </label>
                    <textarea
                      value={eventForm.excerpt}
                      onChange={(e) => setEventForm(prev => ({ ...prev, excerpt: e.target.value }))}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      placeholder="Short summary shown in the events list"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Content <span className="text-red-500">*</span>
                    </label>
                    <RichTextEditor
                      value={eventForm.content}
                      onChange={(content) => setEventForm(prev => ({ ...prev, content }))}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Use the toolbar to format text, add headings, and create lists.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      {editingEventSlug ? 'Update Event' : 'Create Event'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEventForm(false)
                        resetEventForm()
                      }}
                      className="px-4 py-2 bg-white border border-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Existing Events ({events.length})
                </h3>
                {eventsLoading && (
                  <span className="text-xs text-gray-500">Loading events...</span>
                )}
              </div>

              {events.length === 0 ? (
                <p className="text-sm text-gray-600 py-4">
                  No events created yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                          <div className="font-medium text-gray-900">{event.title}</div>
                          {event.eventDate && (
                            <div className="text-xs text-gray-500">
                              {new Date(event.eventDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        {event.excerpt && (
                          <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {event.excerpt}
                          </div>
                        )}
                        {event.category && (
                          <div className="text-xs text-gray-500 mt-1">
                            Category: {event.category}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditEvent(event)}
                          className="px-3 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteEvent(event.slug)}
                          className="px-3 py-1 text-xs font-semibold rounded bg-red-50 text-red-700 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Event enquiries */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Event Enquiries</h2>
                <p className="text-sm text-gray-600">
                  View enquiries submitted from individual event pages.
                </p>
              </div>
              {eventEnquiriesLoading && (
                <span className="text-xs text-gray-500">Loading enquiries...</span>
              )}
            </div>

            {eventEnquiries.length === 0 ? (
              <p className="text-sm text-gray-600 py-4">No event enquiries yet.</p>
            ) : (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Event</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Name</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Email</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Phone</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Message</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {eventEnquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 align-top">
                          <div className="font-medium text-gray-900">{enquiry.eventTitle}</div>
                          {enquiry.eventSlug && (
                            <div className="text-xs text-gray-500">/events/{enquiry.eventSlug}</div>
                          )}
                        </td>
                        <td className="px-4 py-2 align-top text-gray-900">{enquiry.name}</td>
                        <td className="px-4 py-2 align-top text-gray-600">{enquiry.email}</td>
                        <td className="px-4 py-2 align-top text-gray-600">{enquiry.phone}</td>
                        <td className="px-4 py-2 align-top text-gray-600 max-w-xs">
                          <div className="truncate" title={enquiry.message || ''}>
                            {enquiry.message || '—'}
                          </div>
                        </td>
                        <td className="px-4 py-2 align-top text-gray-600">
                          {enquiry.createdAt
                            ? new Date(enquiry.createdAt).toLocaleDateString()
                            : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Journal Management */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Journal Management</h2>
                <p className="text-sm text-gray-600">Create, edit, and manage journal entries.</p>
              </div>
              <button
                onClick={startCreateBlog}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus size={18} />
                New Journal Entry
              </button>
            </div>

            {showBlogForm && (
              <form onSubmit={saveBlog} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={blogForm.authorName}
                      onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">
                      Published Date
                    </label>
                    <input
                      type="date"
                      value={blogForm.publishedDate}
                      onChange={(e) => setBlogForm({ ...blogForm, publishedDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Featured Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBlogImageUpload}
                    disabled={blogImageUploading}
                    className="block w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white cursor-pointer"
                  />
                  {blogImageUploading && <p className="mt-1 text-xs text-gray-500">Uploading...</p>}
                  {blogImagePreview && (
                    <div className="mt-2 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={blogImagePreview} alt="Preview" className="h-16 w-16 object-cover rounded" />
                      <span className="text-xs text-gray-500 break-all">{blogForm.featuredImage}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Excerpt</label>
                  <textarea
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <RichTextEditor
                    value={blogForm.content}
                    onChange={(content) => setBlogForm({ ...blogForm, content })}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700"
                  >
                    {editingBlogSlug ? 'Update Journal Entry' : 'Create Journal Entry'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBlogForm(false)
                      resetBlogForm()
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {blogsLoading ? (
              <p className="text-sm text-gray-500">Loading journal entries...</p>
            ) : blogs.length === 0 ? (
              <p className="text-sm text-gray-500">No journal entries yet. Create your first entry!</p>
            ) : (
              <div className="space-y-2">
                {blogs.map((blog) => (
                  <div key={blog.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{blog.title}</div>
                      <div className="text-xs text-gray-500">Slug: {blog.slug}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditBlog(blog)}
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlog(blog.slug)}
                        className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reviews Management */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Reviews</h2>
              <p className="text-sm text-gray-600">View and manage user reviews.</p>
            </div>
            {reviewsLoading ? (
              <p className="text-sm text-gray-500">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">User</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Rating</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Title</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Content</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reviews.map((review) => (
                      <tr key={review.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-900">{review.user_name || review.userName}</td>
                        <td className="px-4 py-2 text-gray-600">{review.rating}/5</td>
                        <td className="px-4 py-2 text-gray-900">{review.title || '—'}</td>
                        <td className="px-4 py-2 text-gray-600 max-w-xs">
                          <div className="truncate" title={review.content}>{review.content}</div>
                        </td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            review.status === 'approved' ? 'bg-green-100 text-green-700' :
                            review.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {review.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Contact Submissions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Contact Form Submissions</h2>
              <p className="text-sm text-gray-600">View messages submitted through the contact form.</p>
            </div>
            {contactSubmissionsLoading ? (
              <p className="text-sm text-gray-500">Loading submissions...</p>
            ) : contactSubmissions.length === 0 ? (
              <p className="text-sm text-gray-500">No contact submissions yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Name</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Email</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Phone</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Subject</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Message</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {contactSubmissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-900">{submission.name}</td>
                        <td className="px-4 py-2 text-gray-600">{submission.email}</td>
                        <td className="px-4 py-2 text-gray-600">{submission.phone || '—'}</td>
                        <td className="px-4 py-2 text-gray-600">{submission.subject || '—'}</td>
                        <td className="px-4 py-2 text-gray-600 max-w-xs">
                          <div className="truncate" title={submission.message}>{submission.message}</div>
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {submission.submittedAt ? new Date(submission.submittedAt).toLocaleDateString() : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Gallery Management */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Gallery Management</h2>
                <p className="text-sm text-gray-600">Upload and manage gallery images and videos.</p>
              </div>
              <label className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer">
                <Plus size={18} />
                {galleryUploading ? 'Uploading...' : 'Upload Media'}
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleGalleryUpload}
                  disabled={galleryUploading}
                  className="hidden"
                />
              </label>
            </div>

            {galleryLoading ? (
              <p className="text-sm text-gray-500">Loading gallery media...</p>
            ) : galleryImages.length === 0 ? (
              <p className="text-sm text-gray-500">No media yet. Upload your first image or video!</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {galleryImages.map((media) => (
                  <div key={media.id} className="relative group">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                      {media.media_type === 'video' ? (
                        // Video display
                        <video
                          src={`/api/gallery-video/${media.filename}`}
                          controls
                          className="w-full h-full object-cover"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        // Image display
                        <img
                          src={`/api/gallery-image/${media.filename}`}
                          alt={media.originalFilename || 'Gallery image'}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => deleteGalleryImage(media.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                      title={`Delete ${media.media_type === 'video' ? 'video' : 'image'}`}
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="mt-1 text-xs text-gray-500 truncate" title={media.originalFilename}>
                      <div className="flex items-center gap-1">
                        {media.media_type === 'video' ? (
                          <span className="text-blue-600 font-medium">Video</span>
                        ) : (
                          <span className="text-green-600 font-medium">Image</span>
                        )}
                        <span>{media.originalFilename}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Total Submissions</h3>
              <p className="text-4xl font-bold text-gray-900">
                {learningSubmissions.length + lifestyleSubmissions.length + partnerSubmissions.length}
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Learning Inquiries</h3>
              <p className="text-4xl font-bold text-orange-500">{learningSubmissions.length}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Lifestyle Inquiries</h3>
              <p className="text-4xl font-bold text-orange-500">{lifestyleSubmissions.length}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-gray-600 text-sm font-medium mb-2">Partner Inquiries</h3>
              <p className="text-4xl font-bold text-orange-500">{partnerSubmissions.length}</p>
            </div>
          </div>

          {/* Tabs and Filters */}
          <div className="bg-white border border-gray-200 rounded-lg mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-gray-200 gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTab('learning')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === 'learning'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Learning Submissions
                </button>
                <button
                  onClick={() => setSelectedTab('lifestyle')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === 'lifestyle'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Lifestyle Submissions
                </button>
                <button
                  onClick={() => setSelectedTab('partner')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === 'partner'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Partner Submissions
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-orange-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                </select>
              </div>
            </div>

            {/* Submissions Table */}
            <div className="overflow-x-auto">
              {currentSubmissions.length === 0 ? (
                <div className="p-8 text-center text-gray-600">
                  No submissions found.
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                      {selectedTab === 'partner' && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Organization</th>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentSubmissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{submission.name}</td>
                        {selectedTab === 'partner' && (
                          <td className="px-6 py-4 text-sm text-gray-600">{submission.organization || 'N/A'}</td>
                        )}
                        <td className="px-6 py-4 text-sm text-gray-600">{submission.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{submission.phone}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="max-w-xs truncate" title={submission.message}>
                            {submission.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => deleteSubmission(submission.id, selectedTab)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors"
                            title="Delete submission"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Refresh Button */}
          <div className="text-center">
            <button
              onClick={loadSubmissions}
              disabled={loading}
              className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </main>
      </div>
    </>
  )
}
