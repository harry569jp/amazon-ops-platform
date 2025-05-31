colors ${
                          errors.email 
                            ? 'border-red-300 dark:border-red-600' 
                            : 'border-gray-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                        placeholder={t('auth.placeholders.email')}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('auth.fields.password')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`w-full pl-11 pr-11 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.password 
                            ? 'border-red-300 dark:border-red-600' 
                            : 'border-gray-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                        placeholder={t('auth.placeholders.password')}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password Field (Register only) */}
                  {mode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('auth.fields.confirmPassword')}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            errors.confirmPassword 
                              ? 'border-red-300 dark:border-red-600' 
                              : 'border-gray-300 dark:border-slate-600'
                          } bg-white dark:bg-slate-700 text-gray-900 dark:text-white`}
                          placeholder={t('auth.placeholders.confirmPassword')}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t('auth.loading')}</span>
                    </>
                  ) : (
                    <span>
                      {mode === 'login' ? t('auth.login.submit') : t('auth.register.submit')}
                    </span>
                  )}
                </button>

                {/* Switch Mode */}
                <div className="text-center pt-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    {mode === 'login' ? t('auth.login.switchText') : t('auth.register.switchText')}
                    <button
                      type="button"
                      onClick={switchMode}
                      disabled={isLoading}
                      className="ml-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium disabled:opacity-50"
                    >
                      {mode === 'login' ? t('auth.register.switchButton') : t('auth.login.switchButton')}
                    </button>
                  </p>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  export default LoginModal;