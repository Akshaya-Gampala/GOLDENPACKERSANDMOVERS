import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import SEO from '../components/SEO';
import {
  fetchQuotesApi,
  updateQuoteStatusApi,
  deleteQuoteApi,
  fetchGalleryApi,
  uploadGalleryItemApi,
  deleteGalleryItemApi,
  fetchContactMessagesApi,
  deleteContactMessageApi,
  fetchAdminReviewsApi,
  updateReviewStatusApi,
  deleteReviewApi,
} from '../services/api';
import {
  FileText,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Search,
  Upload,
  RefreshCw,
  Eye,
  X,
  Loader2,
  Tag,
  Calendar,
  AlertCircle,
  Star,
  Check,
  XCircle,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';

const AdminDashboard = () => {
  const { admin, logout } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('quotes'); // 'quotes' | 'gallery' | 'contact' | 'reviews'

  // Summary Stats State
  const [stats, setStats] = useState({
    totalQuotes: 0,
    newQuotes: 0,
    completedQuotes: 0,
    totalGallery: 0,
    pendingReviews: 0,
    totalReviews: 0,
  });

  // Quotes State
  const [quotes, setQuotes] = useState([]);
  const [quoteFilterStatus, setQuoteFilterStatus] = useState('All');
  const [quoteSearch, setQuoteSearch] = useState('');
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState(null);

  // Gallery State
  const [galleryItems, setGalleryItems] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPhotoData, setNewPhotoData] = useState({
    title: '',
    description: '',
    category: 'House Shifting',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [fileUpload, setFileUpload] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Contact Messages State
  const [contactMsgs, setContactMsgs] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Reviews State
  const [reviews, setReviews] = useState([]);
  const [reviewFilterStatus, setReviewFilterStatus] = useState('All');
  const [loadingReviews, setLoadingReviews] = useState(false);

  // Load Quotes Data
  const loadQuotes = async () => {
    setLoadingQuotes(true);
    try {
      const res = await fetchQuotesApi({ status: quoteFilterStatus, search: quoteSearch });
      setQuotes(res.data.data);
      setStats((prev) => ({
        ...prev,
        totalQuotes: res.data.stats.total,
        newQuotes: res.data.stats.new,
        completedQuotes: res.data.stats.completed,
      }));
    } catch (err) {
      console.error('Failed to load quotes:', err);
    } finally {
      setLoadingQuotes(false);
    }
  };

  // Load Gallery Data
  const loadGallery = async () => {
    setLoadingGallery(true);
    try {
      const res = await fetchGalleryApi('All');
      setGalleryItems(res.data.data);
      setStats((prev) => ({ ...prev, totalGallery: res.data.data.length }));
    } catch (err) {
      console.error('Failed to load gallery:', err);
    } finally {
      setLoadingGallery(false);
    }
  };

  // Load Contact Messages
  const loadContactMessages = async () => {
    setLoadingContacts(true);
    try {
      const res = await fetchContactMessagesApi();
      setContactMsgs(res.data.data);
    } catch (err) {
      console.error('Failed to load contact messages:', err);
    } finally {
      setLoadingContacts(false);
    }
  };

  // Load Reviews Data
  const loadReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await fetchAdminReviewsApi({ status: reviewFilterStatus });
      setReviews(res.data.data);
      if (res.data.stats) {
        setStats((prev) => ({
          ...prev,
          pendingReviews: res.data.stats.pending,
          totalReviews: res.data.stats.total,
        }));
      }
    } catch (err) {
      console.error('Failed to load admin reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    loadQuotes();
    loadGallery();
    loadContactMessages();
    loadReviews();
  }, [quoteFilterStatus, reviewFilterStatus]);

  // Handle Quote Status Change
  const handleStatusChange = async (quoteId, newStatus) => {
    try {
      await updateQuoteStatusApi(quoteId, { status: newStatus });
      loadQuotes();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // Handle Delete Quote
  const handleDeleteQuote = async (quoteId) => {
    if (!window.confirm('Are you sure you want to delete this quote enquiry?')) return;
    try {
      await deleteQuoteApi(quoteId);
      loadQuotes();
    } catch (err) {
      alert('Failed to delete quote');
    }
  };

  // Handle Upload Gallery Photo
  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('title', newPhotoData.title);
      formData.append('description', newPhotoData.description);
      formData.append('category', newPhotoData.category);
      formData.append('date', newPhotoData.date);

      if (fileUpload) {
        formData.append('image', fileUpload);
      } else if (newPhotoData.imageUrl) {
        formData.append('imageUrl', newPhotoData.imageUrl);
      } else {
        alert('Please select an image file or provide an image URL');
        setUploading(false);
        return;
      }

      await uploadGalleryItemApi(formData);
      alert('Work photo added to gallery successfully!');
      setShowAddModal(false);
      setNewPhotoData({
        title: '',
        description: '',
        category: 'House Shifting',
        imageUrl: '',
        date: new Date().toISOString().split('T')[0],
      });
      setFileUpload(null);
      loadGallery();
    } catch (err) {
      console.error('Upload Error:', err);
      alert(err.response?.data?.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  // Handle Delete Gallery Photo
  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm('Are you sure you want to delete this work photo?')) return;
    try {
      await deleteGalleryItemApi(photoId);
      loadGallery();
    } catch (err) {
      alert('Failed to delete photo');
    }
  };

  // Handle Delete Contact Message
  const handleDeleteContact = async (msgId) => {
    if (!window.confirm('Delete this contact message?')) return;
    try {
      await deleteContactMessageApi(msgId);
      loadContactMessages();
    } catch (err) {
      alert('Failed to delete message');
    }
  };

  // Handle Review Status Change (Approve / Reject)
  const handleReviewStatusChange = async (reviewId, newStatus) => {
    try {
      await updateReviewStatusApi(reviewId, { status: newStatus });
      loadReviews();
    } catch (err) {
      alert('Failed to update review status');
    }
  };

  // Handle Delete Review
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to permanently delete this customer review?')) return;
    try {
      await deleteReviewApi(reviewId);
      loadReviews();
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  return (
    <>
      <SEO title="Admin Dashboard" />

      <div className="min-h-screen bg-slate-100 pb-16">
        
        {/* Dashboard Top Header Bar */}
        <header className="bg-slate-900 text-white py-6 border-b-4 border-amber-500 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Golden Admin Dashboard</h1>
              <p className="text-xs text-slate-400">Logged in as: {admin?.name || admin?.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  loadQuotes();
                  loadGallery();
                  loadContactMessages();
                  loadReviews();
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Total Enquiries</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats.totalQuotes}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">New Enquiries</p>
                <p className="text-3xl font-extrabold text-amber-600 mt-1">{stats.newQuotes}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Pending Reviews</p>
                <p className="text-3xl font-extrabold text-orange-600 mt-1">{stats.pendingReviews}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                <Star className="w-6 h-6 fill-current" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Work Gallery Photos</p>
                <p className="text-3xl font-extrabold text-purple-600 mt-1">{stats.totalGallery}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <ImageIcon className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'quotes' ? 'gold-gradient-bg text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" /> Quotes ({quotes.length})
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 relative ${
                activeTab === 'reviews' ? 'gold-gradient-bg text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Star className="w-4 h-4" /> Customer Reviews ({reviews.length})
              {stats.pendingReviews > 0 && (
                <span className="px-2 py-0.5 text-[10px] bg-red-600 text-white font-extrabold rounded-full animate-pulse">
                  {stats.pendingReviews} New
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'gallery' ? 'gold-gradient-bg text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ImageIcon className="w-4 h-4" /> Gallery Photos ({galleryItems.length})
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'contact' ? 'gold-gradient-bg text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Contact Queries ({contactMsgs.length})
            </button>
          </div>

          {/* TAB 1: QUOTES ENQUIRIES */}
          {activeTab === 'quotes' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-slate-900">Customer Quote Requests</h3>

                <div className="flex items-center gap-3">
                  <select
                    value={quoteFilterStatus}
                    onChange={(e) => setQuoteFilterStatus(e.target.value)}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {loadingQuotes ? (
                <div className="py-16 text-center">
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
                </div>
              ) : quotes.length === 0 ? (
                <div className="py-12 text-center text-slate-500 font-medium">No quote requests found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-700 text-xs font-extrabold uppercase border-b border-slate-200">
                      <tr>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Route</th>
                        <th className="p-4">Date & Service</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {quotes.map((q) => (
                        <tr key={q._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4">
                            <p className="font-bold text-slate-900">{q.name}</p>
                            <p className="text-xs text-slate-500">{q.phone}</p>
                            {q.email && <p className="text-[11px] text-slate-400">{q.email}</p>}
                          </td>

                          <td className="p-4">
                            <p className="text-xs font-semibold text-slate-800">
                              <span className="text-amber-600 font-bold">From:</span> {q.movingFrom}
                            </p>
                            <p className="text-xs font-semibold text-slate-800">
                              <span className="text-emerald-600 font-bold">To:</span> {q.movingTo}
                            </p>
                          </td>

                          <td className="p-4">
                            <p className="text-xs font-bold text-slate-900">{q.service}</p>
                            <p className="text-xs text-slate-500">{q.movingDate}</p>
                          </td>

                          <td className="p-4">
                            <select
                              value={q.status}
                              onChange={(e) => handleStatusChange(q._id, e.target.value)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                                q.status === 'New'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : q.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : q.status === 'Cancelled'
                                  ? 'bg-red-50 text-red-800 border-red-300'
                                  : 'bg-blue-50 text-blue-800 border-blue-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedQuoteDetail(q)}
                              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuote(q._id)}
                              className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                              title="Delete Request"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WORK GALLERY MANAGEMENT */}
          {activeTab === 'gallery' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Work Experience Gallery Management</h3>
                  <p className="text-xs text-slate-500">Upload and manage photographs of actual moving projects.</p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-5 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-extrabold text-xs shadow-md flex items-center gap-1.5 hover:brightness-105"
                >
                  <Plus className="w-4 h-4" /> Add Work Photo
                </button>
              </div>

              {loadingGallery ? (
                <div className="py-16 text-center">
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryItems.map((item) => (
                    <div key={item._id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col justify-between">
                      <div className="h-48 relative bg-slate-900">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <span className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                        <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
                          <span>Date: {item.date}</span>
                          <button
                            onClick={() => handleDeletePhoto(item._id)}
                            className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONTACT MESSAGES */}
          {activeTab === 'contact' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Customer Contact Form Submissions</h3>

              {loadingContacts ? (
                <div className="py-16 text-center">
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
                </div>
              ) : contactMsgs.length === 0 ? (
                <div className="py-12 text-center text-slate-500 font-medium">No contact messages received.</div>
              ) : (
                <div className="space-y-4">
                  {contactMsgs.map((msg) => (
                    <div key={msg._id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900">{msg.name}</h4>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-amber-100 text-amber-800">
                            {msg.subject || 'Inquiry'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">Phone: {msg.phone} {msg.email && `| Email: ${msg.email}`}</p>
                        <p className="text-sm text-slate-700 mt-2 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                          "{msg.message}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleDeleteContact(msg._id)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CUSTOMER REVIEWS MANAGEMENT */}
          {activeTab === 'reviews' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Manage Customer Reviews</h2>
                  <p className="text-xs text-slate-500">Approve customer feedback before it appears publicly on the website.</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 flex-wrap">
                  {['All', 'Pending', 'Approved', 'Rejected'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setReviewFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        reviewFilterStatus === st
                          ? 'bg-slate-900 text-amber-400'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {loadingReviews ? (
                <div className="py-12 text-center text-slate-500 flex items-center justify-center gap-2 font-semibold">
                  <Loader2 className="w-5 h-5 animate-spin text-amber-600" /> Loading customer reviews...
                </div>
              ) : reviews.length === 0 ? (
                <div className="py-12 text-center text-slate-500 font-semibold bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  No reviews found for status "{reviewFilterStatus}".
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((rev) => (
                    <div
                      key={rev._id}
                      className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase ${
                              rev.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : rev.status === 'rejected'
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                            }`}
                          >
                            {rev.status}
                          </span>
                        </div>

                        <p className="text-slate-800 text-sm font-medium leading-relaxed">
                          "{rev.comment}"
                        </p>

                        <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900">— {rev.name}</span>
                            {rev.email && <span className="text-slate-400 ml-1">({rev.email})</span>}
                          </div>
                          <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Admin Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                        {rev.status !== 'approved' && (
                          <button
                            onClick={() => handleReviewStatusChange(rev._id, 'approved')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve
                          </button>
                        )}

                        {rev.status !== 'rejected' && (
                          <button
                            onClick={() => handleReviewStatusChange(rev._id, 'rejected')}
                            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteReview(rev._id)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Modal: View Detailed Quote */}
      {selectedQuoteDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl space-y-6 relative border border-slate-200">
            <button
              onClick={() => setSelectedQuoteDetail(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Enquiry Details
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{selectedQuoteDetail.name}</h3>
              <p className="text-sm text-slate-500">{selectedQuoteDetail.phone} | {selectedQuoteDetail.email || 'No Email'}</p>
            </div>

            <div className="space-y-3 text-sm">
              <p><strong>Route:</strong> {selectedQuoteDetail.movingFrom} → {selectedQuoteDetail.movingTo}</p>
              <p><strong>Moving Date:</strong> {selectedQuoteDetail.movingDate}</p>
              <p><strong>Service:</strong> {selectedQuoteDetail.service}</p>
              <p><strong>Property Type:</strong> {selectedQuoteDetail.propertyType} ({selectedQuoteDetail.rooms})</p>
              <p><strong>Items:</strong> {selectedQuoteDetail.items || 'N/A'}</p>
              <p><strong>Message:</strong> {selectedQuoteDetail.message || 'None'}</p>
              <p><strong>Submitted At:</strong> {new Date(selectedQuoteDetail.createdAt).toLocaleString()}</p>
            </div>

            <button
              onClick={() => setSelectedQuoteDetail(null)}
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* Modal: Add Work Photo */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 relative border border-slate-200">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900">Upload Work Experience Photo</h3>

            <form onSubmit={handleUploadPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={newPhotoData.title}
                  onChange={(e) => setNewPhotoData({ ...newPhotoData, title: e.target.value })}
                  placeholder="e.g. 3BHK Villa Furniture Packing"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Category *</label>
                <select
                  value={newPhotoData.category}
                  onChange={(e) => setNewPhotoData({ ...newPhotoData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white focus:outline-none"
                >
                  <option value="Packing">Packing</option>
                  <option value="Loading">Loading</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Unloading">Unloading</option>
                  <option value="House Shifting">House Shifting</option>
                  <option value="Office Shifting">Office Shifting</option>
                  <option value="Vehicle Moving">Vehicle Moving</option>
                  <option value="Completed Projects">Completed Projects</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Upload File (Multer)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFileUpload(e.target.files[0])}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
                />
              </div>

              <div className="text-center text-xs text-slate-400 font-bold">OR</div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">External Image URL</label>
                <input
                  type="url"
                  value={newPhotoData.imageUrl}
                  onChange={(e) => setNewPhotoData({ ...newPhotoData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={newPhotoData.description}
                  onChange={(e) => setNewPhotoData({ ...newPhotoData, description: e.target.value })}
                  placeholder="Brief description of work completed..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-slate-950 font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Save Work Photo
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
